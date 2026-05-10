-- consultincusa D1 schema — initial migration
-- Run: npm run db:migrate:remote

CREATE TABLE IF NOT EXISTS leads (
  id              TEXT PRIMARY KEY,
  first_name      TEXT NOT NULL,
  email           TEXT NOT NULL,
  whatsapp_e164   TEXT NOT NULL,
  country_of_origin TEXT NOT NULL,
  language        TEXT NOT NULL CHECK (language IN ('en', 'pt', 'es')),
  source          TEXT,                          -- e.g. 'landing_en', 'article_5472', 'book_form'
  anchor_assigned TEXT,                          -- anchor_id once routed
  opt_in_whatsapp INTEGER NOT NULL DEFAULT 0,    -- 0 = false, 1 = true
  drip_step       INTEGER NOT NULL DEFAULT 0,    -- 0 = welcome sent, 1 = 5472 sent, etc.
  last_msg_sent_at TEXT,                         -- ISO 8601
  next_msg_due_at  TEXT,                         -- ISO 8601 — when scheduler should fire next msg
  replied_at      TEXT,                          -- ISO 8601 — set on first inbound message
  call_booked_at  TEXT,
  signed_at       TEXT,
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_whatsapp ON leads(whatsapp_e164);
CREATE INDEX IF NOT EXISTS idx_leads_next_msg_due ON leads(next_msg_due_at) WHERE replied_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_leads_anchor ON leads(anchor_assigned);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);

-- Inbound WhatsApp messages (audit log + reply detection)
CREATE TABLE IF NOT EXISTS whatsapp_messages (
  id              TEXT PRIMARY KEY,
  lead_id         TEXT,
  direction       TEXT NOT NULL CHECK (direction IN ('outbound', 'inbound')),
  template_name   TEXT,                          -- only on outbound
  body            TEXT,                          -- only on inbound or for log
  meta_message_id TEXT,                          -- Meta's wamid
  status          TEXT,                          -- sent, delivered, read, failed
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (lead_id) REFERENCES leads(id)
);

CREATE INDEX IF NOT EXISTS idx_msgs_lead ON whatsapp_messages(lead_id);
CREATE INDEX IF NOT EXISTS idx_msgs_meta ON whatsapp_messages(meta_message_id);

-- Anchors (cell ownership)
CREATE TABLE IF NOT EXISTS anchors (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL,
  whatsapp_e164   TEXT NOT NULL,
  email           TEXT NOT NULL,
  metro           TEXT,
  country_focus   TEXT,                          -- e.g. 'Brazil' or 'Mexico,Colombia'
  languages       TEXT,                          -- comma-separated, e.g. 'pt,en'
  active          INTEGER NOT NULL DEFAULT 1,
  signed_at       TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_anchors_country ON anchors(country_focus);
CREATE INDEX IF NOT EXISTS idx_anchors_metro ON anchors(metro);
