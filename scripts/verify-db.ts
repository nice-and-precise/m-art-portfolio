/**
 * Verify Supabase database has pottery pieces
 */

import { sql } from '@vercel/postgres';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function verifyDatabase() {
  console.log('🔍 Verifying Supabase database...\n');

  try {
    // Count total pieces
    const countResult = await sql.query('SELECT COUNT(*) FROM pottery_pieces');
    const count = countResult.rows[0].count;

    console.log(`📊 Total pottery pieces: ${count}`);

    if (count === '8') {
      console.log('✅ Perfect! All 8 sample pieces loaded.\n');
    } else {
      console.log(`⚠️  Expected 8, found ${count}\n`);
    }

    // List all pieces
    const piecesResult = await sql.query(
      'SELECT id, title, collection, featured FROM pottery_pieces ORDER BY created_at'
    );

    console.log('📋 Pottery pieces in database:\n');
    piecesResult.rows.forEach((piece, index) => {
      const featuredIcon = piece.featured ? '⭐' : '  ';
      console.log(
        `${index + 1}. ${featuredIcon} ${piece.title} (${piece.collection})`
      );
    });

    console.log('\n✅ Database verification complete!');
    console.log('🚀 Ready for production deployment!\n');
  } catch (error) {
    console.error('\n❌ Error verifying database:', error);
    process.exit(1);
  }
}

verifyDatabase();
