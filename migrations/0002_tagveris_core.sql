-- TAGVERIS - additive migration 0002

ALTER TABLE manufacturers ADD COLUMN vat_number TEXT;
ALTER TABLE manufacturers ADD COLUMN estimated_annual_volume INTEGER;
ALTER TABLE manufacturers ADD COLUMN contact_first_name TEXT;
ALTER TABLE manufacturers ADD COLUMN contact_last_name TEXT;
ALTER TABLE manufacturers ADD COLUMN approved_at TEXT;

ALTER TABLE users ADD COLUMN failed_login_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN locked_until TEXT;

ALTER TABLE products ADD COLUMN batch_number TEXT;

ALTER TABLE product_tags ADD COLUMN activated_at TEXT;
ALTER TABLE product_tags ADD COLUMN last_scanned_at TEXT;

CREATE INDEX IF NOT EXISTS idx_products_batch
ON products(manufacturer_id, batch_number);

CREATE INDEX IF NOT EXISTS idx_sessions_expires
ON sessions(expires_at);

CREATE INDEX IF NOT EXISTS idx_verifications_result
ON verifications(result, created_at);

CREATE INDEX IF NOT EXISTS idx_manufacturers_status
ON manufacturers(status);

INSERT OR IGNORE INTO schema_migrations (version, applied_at)
VALUES (2, datetime('now'));
