/**
 * Initialize Supabase database with pottery_pieces table and seed data
 */

import { sql } from '@vercel/postgres';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function initializeDatabase() {
  console.log('🚀 Starting Supabase database initialization...\n');

  try {
    // Read the SQL file
    const sqlPath = path.join(process.cwd(), 'scripts', 'init-db.sql');
    let sqlContent = await fs.readFile(sqlPath, 'utf-8');

    console.log('📝 SQL file loaded successfully');
    console.log(`📊 Connection: ${process.env.POSTGRES_HOST}\n`);

    // Remove comments from SQL
    sqlContent = sqlContent
      .split('\n')
      .filter((line) => !line.trim().startsWith('--'))
      .join('\n');

    // Execute the entire SQL file (Postgres can handle multiple statements)
    console.log('⚙️  Executing SQL initialization script...\n');

    try {
      // Use the non-pooling connection for direct SQL execution
      const { Pool } = await import('pg');
      const pool = new Pool({
        connectionString: process.env.POSTGRES_URL_NON_POOLING,
        ssl: {
          rejectUnauthorized: false, // Required for Supabase
        },
      });

      await pool.query(sqlContent);
      await pool.end();

      console.log(`✅ SQL executed successfully\n`);
    } catch (error: any) {
      // Ignore "already exists" and "duplicate key" errors
      if (
        error.message.includes('already exists') ||
        error.message.includes('duplicate key')
      ) {
        console.log(`⚠️  Tables already exist (this is fine)\n`);
      } else {
        throw error;
      }
    }

    // Verify the data
    console.log('🔍 Verifying database setup...');
    const result = await sql.query('SELECT COUNT(*) FROM pottery_pieces');
    const count = result.rows[0].count;

    console.log(`\n✅ Database initialized successfully!`);
    console.log(`📊 Pottery pieces in database: ${count}`);

    if (count === '8') {
      console.log('🎉 All 8 sample pieces loaded correctly!\n');
    } else {
      console.log(`⚠️  Expected 8 pieces, found ${count}\n`);
    }

    // Show a sample piece
    const sample = await sql.query(
      'SELECT id, title, collection FROM pottery_pieces LIMIT 1'
    );
    console.log('Sample piece:', sample.rows[0]);

    console.log('\n🎨 Database ready for M_ART pottery portfolio!');
  } catch (error) {
    console.error('\n❌ Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();
