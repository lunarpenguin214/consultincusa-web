import { z } from 'zod'

interface Env {
  ASSETS: Fetcher
  DB?: D1Database
  SLACK_LEAD_WEBHOOK?: string
}

const LeadSchema = z.object({
  email: z.string().email(),
  industry: z.enum(['dtc', 'agency', 'newsletter']),
  source: z.string().max(200).optional(),
})

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    if (url.pathname === '/api/leads' && request.method === 'POST') {
      return handleLeads(request, env)
    }
    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>

async function handleLeads(request: Request, env: Env): Promise<Response> {
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
  const id = crypto.randomUUID()

  if (!env.DB) {
    console.error('D1 binding missing — lead not persisted')
    return json({ error: 'Database not configured' }, 503)
  }

  try {
    await env.DB.prepare(
      `INSERT INTO leads (id, email, industry, source, created_at)
       VALUES (?, ?, ?, ?, datetime('now'))`,
    )
      .bind(id, lead.email, lead.industry, lead.source ?? null)
      .run()
  } catch (err) {
    console.error('D1 insert failed', err)
    return json({ error: 'Database error' }, 500)
  }

  if (env.SLACK_LEAD_WEBHOOK) {
    try {
      await fetch(env.SLACK_LEAD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `📬 New lead — ${lead.industry.toUpperCase()} — ${lead.email}`,
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*New lead* — ${lead.industry.toUpperCase()}\n*Email:* ${lead.email}\n*Source:* ${lead.source ?? 'direct'}\n*ID:* \`${id}\``,
              },
            },
          ],
        }),
      })
    } catch (err) {
      console.error('Slack webhook failed (non-fatal)', err)
    }
  }

  return json({ ok: true, id }, 201)
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
