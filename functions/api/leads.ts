// POST /api/leads
// Body: { first_name, email, whatsapp_e164, country_of_origin, language, source, opt_in_whatsapp }
// Effect: insert lead into D1, fire WhatsApp template msg 1 via Meta Graph API.

import { sendWhatsAppTemplate } from '../_lib/whatsapp'
import { z } from 'zod'

interface Env {
  DB: D1Database
  META_ACCESS_TOKEN: string
  PHONE_NUMBER_ID: string
  ALERT_WEBHOOK_URL?: string
}

const LeadSchema = z.object({
  first_name: z.string().min(1).max(80),
  email: z.string().email(),
  whatsapp_e164: z.string().regex(/^\+\d{6,20}$/),
  country_of_origin: z.string().min(1).max(80),
  language: z.enum(['en', 'pt', 'es']),
  source: z.string().max(80).optional(),
  opt_in_whatsapp: z.boolean(),
})

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const parsed = LeadSchema.safeParse(body)
  if (!parsed.success) {
    return json({ error: 'Validation failed', issues: parsed.error.issues }, 400)
  }
  const lead = parsed.data
  if (!lead.opt_in_whatsapp) {
    return json({ error: 'WhatsApp opt-in is required' }, 400)
  }

  const id = crypto.randomUUID()
  const now = new Date().toISOString()
  // Schedule next message (msg 2 = +24h)
  const nextDue = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

  try {
    await env.DB.prepare(
      `INSERT INTO leads
        (id, first_name, email, whatsapp_e164, country_of_origin, language,
         source, opt_in_whatsapp, drip_step, last_msg_sent_at, next_msg_due_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1, 0, ?, ?, ?, ?)`,
    )
      .bind(
        id,
        lead.first_name,
        lead.email,
        lead.whatsapp_e164,
        lead.country_of_origin,
        lead.language,
        lead.source ?? null,
        now,
        nextDue,
        now,
        now,
      )
      .run()
  } catch (err) {
    console.error('D1 insert failed', err)
    return json({ error: 'Database error' }, 500)
  }

  // Fire welcome WhatsApp template (don't block on this — best effort)
  try {
    const templateName = `cu_welcome_${lead.language}`
    const anchorName = 'Yomama' // TODO: assign per cell
    const callTime = 'TBD'
    await sendWhatsAppTemplate(env, {
      to: lead.whatsapp_e164,
      templateName,
      languageCode: lead.language === 'en' ? 'en_US' : lead.language === 'pt' ? 'pt_BR' : 'es_LA',
      bodyParams: [lead.first_name, anchorName, callTime],
      leadId: id,
    })
  } catch (err) {
    console.error('WhatsApp send failed (non-fatal)', err)
  }

  // Optional: ping anchor's Slack/Discord
  if (env.ALERT_WEBHOOK_URL) {
    try {
      await fetch(env.ALERT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `New lead: ${lead.first_name} from ${lead.country_of_origin} (${lead.language}). WhatsApp: ${lead.whatsapp_e164}`,
        }),
      })
    } catch {
      /* swallow */
    }
  }

  return json({ ok: true, lead_id: id }, 201)
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
