// Remove placeholder pieces from gallery database
// Usage: node scripts/remove-placeholder-pieces.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function removePlaceholders() {
  console.log('Checking for placeholder pieces in gallery database...\n');

  try {
    // Get all pieces
    const { data: allPieces, error: fetchError } = await supabase
      .from('pottery_pieces')
      .select('*')
      .order('created_at', { ascending: true });

    if (fetchError) {
      console.error('❌ Error fetching pieces:', fetchError.message);
      process.exit(1);
    }

    console.log(`📊 Found ${allPieces.length} total pieces in database\n`);

    // Identify placeholders (non-Portfolio pieces with Unsplash URLs or test data)
    const placeholders = allPieces.filter(piece => {
      // Portfolio pieces are the real ones we want to keep
      if (piece.collection === 'Portfolio') {
        return false;
      }

      // Check if images contain Unsplash URLs (common placeholder source)
      const hasUnsplashImage = piece.images?.some(img =>
        img.url?.includes('unsplash.com')
      );

      return hasUnsplashImage || piece.collection !== 'Portfolio';
    });

    console.log(`🗑️  Found ${placeholders.length} placeholder pieces to remove:`);
    placeholders.forEach(piece => {
      console.log(`   - "${piece.title}" (${piece.collection})`);
    });
    console.log('');

    if (placeholders.length === 0) {
      console.log('✅ No placeholders found. Database is clean!');
      return;
    }

    // Wait 2 seconds before deleting
    console.log('⏳ Removing placeholders in 2 seconds... (Ctrl+C to cancel)\n');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Delete each placeholder
    let deletedCount = 0;
    let failedCount = 0;

    for (const piece of placeholders) {
      const { error: deleteError } = await supabase
        .from('pottery_pieces')
        .delete()
        .eq('id', piece.id);

      if (deleteError) {
        console.error(`❌ Error deleting "${piece.title}":`, deleteError.message);
        failedCount++;
      } else {
        console.log(`✅ Deleted "${piece.title}"`);
        deletedCount++;
      }
    }

    console.log('\n=== Summary ===');
    console.log(`✅ Successfully deleted: ${deletedCount} pieces`);
    console.log(`❌ Failed to delete: ${failedCount} pieces`);
    console.log(`📊 Remaining pieces in database: ${allPieces.length - deletedCount}`);

  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

removePlaceholders().then(() => {
  console.log('\n✅ Script complete!');
  process.exit(0);
});
