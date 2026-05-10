// Meta WhatsApp Cloud API helpers — Pages Functions side.
// Docs: https://developers.facebook.com/docs/whatsapp/cloud-api

interface SendEnv {
  DB: D1Database
  META_ACCESS_TOKEN: string
  PHONE_NUMBER_ID: string
}

export interface TemplatePayload {
  to: string
  templateName: string
  languageCode: string
  bodyParams: string[]
  buttonUrlParams?: string[]
  leadId?: string
}

export async function sendWhatsAppTemplate(env: SendEnv, payload: TemplatePayload) {
  const { to, templateName, languageCode, bodyParams, buttonUrlParams = [], leadId } = payload
  const url = `https://graph.facebook.com/v22.0/${env.PHONE_NUMBER_ID}/messages`

  const components: unknown[] = [
    {
      type: 'body',
      parameters: bodyParams.map((text) => ({ type: 'text', text })),
    },
  ]

  if (buttonUrlParams.length > 0) {
    components.push({
      type: 'button',
      sub_type: 'url',
      index: '0',
      parameters: buttonUrlParams.map((text) => ({ type: 'text', text })),
    })
  }

  const body = {
    messaging_product: 'whatsapp',
    to: to.replace(/^\+/, ''),
    type: 'template',
    template: {
      name: templateName,
      language: { code: languageCode },
      components,
    },
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.META_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = (await res.json()) as { messages?: { id: string }[]; error?: unknown }
  if (!res.ok) {
    throw new Error(`Meta API error ${res.status}: ${JSON.stringify(data.error ?? data)}`)
  }

  // Log outbound to whatsapp_messages
  if (leadId && data.messages?.[0]?.id) {
    await env.DB.prepare(
      `INSERT INTO whatsapp_messages (id, lead_id, direction, template_name, meta_message_id, status, created_at)
       VALUES (?, ?, 'outbound', ?, ?, 'sent', datetime('now'))`,
    )
      .bind(crypto.randomUUID(), leadId, templateName, data.messages[0].id)
      .run()
  }

  return data
}

// Map drip step (0..4) → template name + body params
export interface DripContext {
  language: 'en' | 'pt' | 'es'
  first_name: string
  anchor_name: string
  cohort_date?: string
}

export function dripTemplate(step: number, ctx: DripContext): {
  templateName: string
  languageCode: string
  bodyParams: string[]
} | null {
  const langSuffix = ctx.language
  const languageCode =
    ctx.language === 'en' ? 'en_US' : ctx.language === 'pt' ? 'pt_BR' : 'es_LA'

  switch (step) {
    case 1: // Welcome (sent inline at lead capture, but listed for completeness)
      return {
        templateName: `cu_welcome_${langSuffix}`,
        languageCode,
        bodyParams: [ctx.first_name, ctx.anchor_name, 'TBD'],
      }
    case 2: // 5472 value drop +24h
      return {
        templateName: `cu_value_5472_${langSuffix}`,
        languageCode,
        bodyParams: [ctx.first_name, ctx.anchor_name],
      }
    case 3: // Soft offer +48h
      return {
        templateName: `cu_offer_bundle_${langSuffix}`,
        languageCode,
        bodyParams: [ctx.first_name],
      }
    case 4: // Scarcity +72h
      return {
        templateName: `cu_scarcity_cohort_${langSuffix}`,
        languageCode,
        bodyParams: [ctx.first_name, ctx.cohort_date ?? 'next Monday'],
      }
    case 5: // Final +5d
      return {
        templateName: `cu_final_or_alt_${langSuffix}`,
        languageCode,
        bodyParams: [ctx.first_name, ctx.anchor_name],
      }
    default:
      return null
  }
}

// Hours between each drip step
export const DRIP_DELAYS_HOURS = [0, 24, 24, 24, 24, 48] // step 1 -> step 2 = 24h, etc.
