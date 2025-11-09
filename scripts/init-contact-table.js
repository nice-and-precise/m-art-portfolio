// Initialize contact_submissions table in Supabase
// This script creates the table using raw SQL via pg client

const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

const SQL = `
CREATE TABLE IF NOT EXISTS contact_submissions (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  inquiry_type VARCHAR(50) NOT NULL CHECK (inquiry_type IN ('commission', 'purchase', 'collaboration', 'exhibition', 'general')),
  message TEXT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_inquiry_type ON contact_submissions(inquiry_type);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
`;

async function createTable() {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
    ssl: process.env.POSTGRES_URL_NON_POOLING?.includes('sslmode=require')
      ? { rejectUnauthorized: false }
      : false
  });

  try {
    console.log('🔌 Connecting to Supabase PostgreSQL...');
    await client.connect();
    console.log('✅ Connected');

    console.log('\n📝 Creating contact_submissions table...');
    await client.query(SQL);
    console.log('✅ Table created successfully!');

    // Verify table exists
    console.log('\n🔍 Verifying table...');
    const result = await client.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'contact_submissions'
      ORDER BY ordinal_position;
    `);

    console.log('\n✅ Table structure:');
    result.rows.forEach(row => {
      console.log(`   - ${row.column_name}: ${row.data_type}`);
    });

    console.log('\n🎉 Contact form database is ready!');

  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log('✅ Table already exists!');
    } else {
      console.error('\n❌ Error:', error.message);
      console.log('\n📋 Manual setup instructions:');
      console.log('1. Go to: https://supabase.com/dashboard/project/bmpvyneaekkyrnldkpta/sql');
      console.log('2. Copy SQL from: supabase/migrations/002_create_contact_submissions.sql');
      console.log('3. Paste and run in SQL Editor');
      process.exit(1);
    }
  } finally {
    await client.end();
  }
}

createTable();
