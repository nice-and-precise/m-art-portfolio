// Migration script: Move data from pottery.json to Vercel Postgres
// Run this ONCE after setting up the database

import { sql } from '@vercel/postgres';
import { readFileSync } from 'fs';
import { join } from 'path';

interface PotteryImage {
  url: string;
  publicId: string;
  width: number;
  height: number;
}

interface PotteryPiece {
  id: string;
  title: string;
  description?: string;
  collection: string;
  images: PotteryImage[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Database {
  pieces: PotteryPiece[];
}

async function migrate() {
  try {
    console.log('🚀 Starting migration from pottery.json to Vercel Postgres...\n');

    // Read pottery.json
    const dataPath = join(process.cwd(), 'data', 'pottery.json');
    const fileContent = readFileSync(dataPath, 'utf-8');
    const db: Database = JSON.parse(fileContent);

    console.log(`📦 Found ${db.pieces.length} pieces in pottery.json\n`);

    // Insert each piece into database
    let successCount = 0;
    let errorCount = 0;

    for (const piece of db.pieces) {
      try {
        await sql`
          INSERT INTO pottery_pieces (
            id, title, description, collection, images, featured, created_at, updated_at
          )
          VALUES (
            ${piece.id},
            ${piece.title},
            ${piece.description || null},
            ${piece.collection},
            ${JSON.stringify(piece.images)}::jsonb,
            ${piece.featured},
            ${piece.createdAt},
            ${piece.updatedAt}
          )
          ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            description = EXCLUDED.description,
            collection = EXCLUDED.collection,
            images = EXCLUDED.images,
            featured = EXCLUDED.featured,
            updated_at = EXCLUDED.updated_at
        `;
        console.log(`✅ Migrated: ${piece.title}`);
        successCount++;
      } catch (error) {
        console.error(`❌ Failed to migrate ${piece.title}:`, error);
        errorCount++;
      }
    }

    console.log(`\n🎉 Migration complete!`);
    console.log(`   Success: ${successCount}`);
    console.log(`   Errors: ${errorCount}`);

    // Verify migration
    const result = await sql`SELECT COUNT(*) as count FROM pottery_pieces`;
    console.log(`\n📊 Database now contains ${result.rows[0].count} pieces`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrate()
  .then(() => {
    console.log('\n✨ All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
