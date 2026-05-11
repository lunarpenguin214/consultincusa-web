-- migrations/0002_simplify_leads.sql
-- Pivot: drop WhatsApp / anchor infra. Replace leads table with industry-only schema.

DROP TABLE IF EXISTS whatsapp_messages;
DROP TABLE IF EXISTS anchors;
DROP TABLE IF EXISTS leads;

CREATE TABLE leads (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  industry TEXT NOT NULL CHECK (industry IN ('dtc', 'agency', 'newsletter')),
  source TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_industry ON leads(industry);
CREATE INDEX idx_leads_created ON leads(created_at);
