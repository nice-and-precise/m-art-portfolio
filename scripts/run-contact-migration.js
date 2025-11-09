// Run contact_submissions table migration
// Usage: node scripts/run-contact-migration.js

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const connectionString = process.env.POSTGRES_URL_NON_POOLING;

if (!connectionString) {
  console.error('Error: Missing POSTGRES_URL_NON_POOLING');
  process.exit(1);
}

async function runMigration() {
  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('✓ Connected to database');

    console.log('\nRunning contact_submissions table migration...');

    // Read the SQL file
    const sqlPath = path.join(__dirname, '..', 'supabase', 'migrations', '002_create_contact_submissions.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Execute the SQL
    await client.query(sql);

    console.log('✅ Migration completed successfully!');
    console.log('\nContact submissions table created with:');
    console.log('  - Fields: id, name, email, phone, inquiry_type, message, status, created_at, updated_at');
    console.log('  - Indexes: created_at, status, inquiry_type, email');

  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
