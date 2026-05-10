// GET  /api/whatsapp/webhook  — Meta verification challenge
// POST /api/whatsapp/webhook  — Meta posts incoming events here

interface Env {
  DB: D1Database
  WEBHOOK_VERIFY_TOKEN: string
  ALERT_WEBHOOK_URL?: string
}

// GET handler — Meta one-time subscription verification
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url)
  const mode = url.searchParams.get('hub.mode')
  const token = url.searchParams.get('hub.verify_token')
  const challenge = url.searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === env.WEBHOOK_VERIFY_TOKEN && challenge) {
    return new Response(challenge, { status: 200, headers: { 'Content-Type': 'text/plain' } })
  }
  return new Response('forbidden', { status: 403 })
}

// POST handler — Meta delivers messages, status updates here
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const payload = (await request.json()) as MetaWebhookPayload

  // Acknowledge fast, then process
  // (Meta retries if we don't 200 within 20s)
  const promise = processPayload(env, payload)
  // Use waitUntil-equivalent by not awaiting fully — but Pages doesn't expose ctx here
  // so we just await. Meta is patient enough.
  await promise

  return new Response('ok', { status: 200 })
}

interface MetaWebhookPayload {
  entry?: Array<{
    changes?: Array<{
      value: {
        messages?: Array<{
          from: string
          id: string
          timestamp: string
          text?: { body: string }
          type: string
        }>
        statuses?: Array<{
          id: string
          status: 'sent' | 'delivered' | 'read' | 'failed'
          timestamp: string
        }>
      }
    }>
  }>
}

async function processPayload(env: Env, payload: MetaWebhookPayload) {
  for (const entry of payload.entry ?? []) {
    for (const change of entry.changes ?? []) {
      // Inbound messages from leads
      for (const msg of change.value.messages ?? []) {
        const fromE164 = `+${msg.from}`
        const body = msg.text?.body ?? `[${msg.type} message]`

        // Find the lead by whatsapp_e164
        const lead = await env.DB.prepare(
          `SELECT id, first_name, language FROM leads WHERE whatsapp_e164 = ?`,
        )
          .bind(fromE164)
          .first<{ id: string; first_name: string; language: string }>()

        if (lead) {
          // Mark replied + pause drip
          await env.DB.prepare(
            `UPDATE leads SET replied_at = datetime('now'), next_msg_due_at = NULL, updated_at = datetime('now') WHERE id = ?`,
          )
            .bind(lead.id)
            .run()
        }

        // Log inbound
        await env.DB.prepare(
          `INSERT INTO whatsapp_messages (id, lead_id, direction, body, meta_message_id, created_at)
           VALUES (?, ?, 'inbound', ?, ?, datetime('now'))`,
        )
          .bind(crypto.randomUUID(), lead?.id ?? null, body, msg.id)
          .run()

        // Alert anchor (Slack/Discord webhook)
        if (env.ALERT_WEBHOOK_URL && lead) {
          await fetch(env.ALERT_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: `📩 Lead replied: ${lead.first_name} (${lead.language}) — "${body}"`,
            }),
          }).catch(() => {})
        }
      }

      // Status updates (sent / delivered / read / failed)
      for (const st of change.value.statuses ?? []) {
        await env.DB.prepare(
          `UPDATE whatsapp_messages SET status = ? WHERE meta_message_id = ?`,
        )
          .bind(st.status, st.id)
          .run()
      }
    }
  }
}
