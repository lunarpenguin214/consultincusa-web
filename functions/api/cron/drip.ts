// POST /api/cron/drip
// Triggered by an external cron (cron-job.org or a CF Worker Cron Trigger)
// every 15 min. Auth: x-cron-secret header must match DRIP_CRON_SECRET.
//
// Effect: scan leads with next_msg_due_at <= now AND replied_at IS NULL,
// send next drip template, advance drip_step, schedule next.

import { sendWhatsAppTemplate, dripTemplate, DRIP_DELAYS_HOURS } from '../../_lib/whatsapp'

interface Env {
  DB: D1Database
  META_ACCESS_TOKEN: string
  PHONE_NUMBER_ID: string
  DRIP_CRON_SECRET: string
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const secret = request.headers.get('x-cron-secret')
  if (secret !== env.DRIP_CRON_SECRET) {
    return new Response('forbidden', { status: 403 })
  }

  const now = new Date().toISOString()

  const due = await env.DB.prepare(
    `SELECT id, first_name, whatsapp_e164, language, drip_step
     FROM leads
     WHERE replied_at IS NULL
       AND next_msg_due_at IS NOT NULL
       AND next_msg_due_at <= ?
       AND drip_step < 5
     LIMIT 50`,
  )
    .bind(now)
    .all<{
      id: string
      first_name: string
      whatsapp_e164: string
      language: 'en' | 'pt' | 'es'
      drip_step: number
    }>()

  let sent = 0
  let failed = 0

  for (const lead of due.results ?? []) {
    const nextStep = lead.drip_step + 1
    const tpl = dripTemplate(nextStep, {
      language: lead.language,
      first_name: lead.first_name,
      anchor_name: 'Yomama', // TODO: lookup from anchors table
      cohort_date: 'next Monday',
    })
    if (!tpl) continue

    try {
      await sendWhatsAppTemplate(env, {
        to: lead.whatsapp_e164,
        templateName: tpl.templateName,
        languageCode: tpl.languageCode,
        bodyParams: tpl.bodyParams,
        leadId: lead.id,
      })

      const delayHours = DRIP_DELAYS_HOURS[nextStep] ?? 0
      const nextDue =
        nextStep < 5
          ? new Date(Date.now() + delayHours * 3600_000).toISOString()
          : null

      await env.DB.prepare(
        `UPDATE leads
         SET drip_step = ?, last_msg_sent_at = datetime('now'), next_msg_due_at = ?, updated_at = datetime('now')
         WHERE id = ?`,
      )
        .bind(nextStep, nextDue, lead.id)
        .run()
      sent++
    } catch (err) {
      console.error('Drip send failed for lead', lead.id, err)
      failed++
    }
  }

  return new Response(JSON.stringify({ ok: true, sent, failed, scanned: due.results?.length ?? 0 }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
