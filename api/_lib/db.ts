import { neon } from '@neondatabase/serverless'

export const sql = neon(process.env.DATABASE_URL!)

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      company VARCHAR(255),
      fleet_size VARCHAR(50),
      message TEXT NOT NULL,
      read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS pricing (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price_monthly INTEGER NOT NULL,
      price_yearly INTEGER NOT NULL,
      features JSONB DEFAULT '[]',
      highlighted BOOLEAN DEFAULT FALSE,
      cta_text VARCHAR(255) DEFAULT 'Get Started',
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS feature_flags (
      id VARCHAR(100) PRIMARY KEY,
      page VARCHAR(100) NOT NULL,
      label VARCHAR(255) NOT NULL,
      enabled BOOLEAN DEFAULT TRUE,
      sort_order INTEGER DEFAULT 0,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  // Insert default feature flags if not exists
  const existingFlags = await sql`SELECT COUNT(*) FROM feature_flags`
  if (parseInt(existingFlags[0].count) === 0) {
    await sql`
      INSERT INTO feature_flags (id, page, label, enabled, sort_order)
      VALUES
        ('job-cards', 'features', 'Digital Job Cards', true, 0),
        ('inspections', 'features', 'Pre-Trip & Safety Inspections', true, 1),
        ('ai-invoices', 'features', 'AI Invoice Processing', true, 2),
        ('fleet-tracking', 'features', 'Live Fleet Tracking', true, 3),
        ('analytics', 'features', 'Fleet Analytics', true, 4),
        ('compliance', 'features', 'Compliance Management', true, 5)
    `
  }

  // Insert default pricing if not exists
  const existingPricing = await sql`SELECT COUNT(*) FROM pricing`
  if (parseInt(existingPricing[0].count) === 0) {
    await sql`
      INSERT INTO pricing (id, name, description, price_monthly, price_yearly, features, highlighted, cta_text)
      VALUES
        ('starter', 'Starter', 'For small workshops and owner-operators', 49, 470,
         '["Up to 10 vehicles", "Digital job cards", "Basic inspections", "Email support", "1 user seat"]'::jsonb,
         false, 'Start Free Trial'),
        ('professional', 'Professional', 'For growing fleets and workshops', 149, 1430,
         '["Up to 50 vehicles", "Everything in Starter", "AI invoice processing", "Fleet analytics", "Priority support", "5 user seats"]'::jsonb,
         true, 'Start Free Trial'),
        ('enterprise', 'Enterprise', 'For large operations with complex needs', 399, 3830,
         '["Unlimited vehicles", "Everything in Professional", "Live GPS tracking", "Custom integrations", "Dedicated account manager", "Unlimited users", "SLA guarantee"]'::jsonb,
         false, 'Contact Sales')
    `
  }
}
