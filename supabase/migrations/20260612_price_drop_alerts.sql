-- Price Drop Alerts Table
-- Customers can request WhatsApp notification when a product's price drops.
-- Admin views these in Admin Panel → 🔔 Price Drops.

CREATE TABLE IF NOT EXISTS price_drop_alerts (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id  text,
  product_name text,
  wa_number   text,
  price_at_alert numeric,
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE price_drop_alerts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "open_price_drop_alerts" ON price_drop_alerts;

CREATE POLICY "open_price_drop_alerts"
  ON price_drop_alerts
  FOR ALL
  USING (true)
  WITH CHECK (true);
