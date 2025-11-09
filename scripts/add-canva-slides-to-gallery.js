// Add Canva portfolio slides to gallery database
// Usage: node scripts/add-canva-slides-to-gallery.js

const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Load Canva slide URLs
const slideUrlsPath = path.join(__dirname, '..', 'data', 'canva-slide-urls.json');
const slideUrls = JSON.parse(fs.readFileSync(slideUrlsPath, 'utf8'));

// Portfolio pieces metadata
const portfolioPieces = [
  {
    title: 'Portfolio Cover',
    description: 'Welcome to my ceramic art journey - a showcase of three years of passion, growth, and artistic expression.',
    slideNumber: 1,
  },
  {
    title: 'Sophomore Year Journey (2023-2024)',
    description: 'Learning the basics: wheel throwing, centering clay, and developing foundational ceramic skills. Hours spent at the potter\'s wheel every day.',
    slideNumber: 2,
  },
  {
    title: 'Junior Year Growth (2024-2025)',
    description: 'Advanced techniques: larger forms, detailed work, and mastering glaze chemistry. First recognition in art exhibits and shows.',
    slideNumber: 3,
  },
  {
    title: 'Achievements & Awards',
    description: 'Legacy Award winner, 3rd Place at Paramount Art Show, and Superior rating (10/10) at Art State Fair.',
    slideNumber: 4,
  },
  {
    title: 'Galaxy Glaze Collection (Senior Year)',
    description: 'My signature galaxy glaze series - mesmerizing cosmic effects that showcase three years of mastery. Each piece features unique celestial patterns.',
    slideNumber: 5,
    featured: true, // Feature the galaxy collection
  },
  {
    title: 'Artistic Vision',
    description: 'Exploring the intersection of traditional ceramic techniques and contemporary artistic expression.',
    slideNumber: 6,
  },
  {
    title: 'Creative Process',
    description: 'Behind the scenes: from clay to finished piece, showcasing the dedication and craftsmanship in every creation.',
    slideNumber: 7,
  },
  {
    title: 'Collection Highlights',
    description: 'A curated selection of favorite pieces from my three-year journey in ceramic arts.',
    slideNumber: 8,
  },
  {
    title: 'Glaze Techniques',
    description: 'Demonstrating various glaze applications and the stunning results achievable through experimentation.',
    slideNumber: 9,
  },
  {
    title: 'Artist Statement',
    description: 'Reflections on my artistic journey, inspirations, and the future of my ceramic art practice.',
    slideNumber: 10,
  },
];

async function addPortfolioSlides() {
  console.log('Adding Canva portfolio slides to gallery database...\n');

  try {
    // Check if pieces already exist
    const { data: existing } = await supabase
      .from('pottery_pieces')
      .select('title')
      .eq('collection', 'Portfolio');

    if (existing && existing.length > 0) {
      console.log(`⚠️  Found ${existing.length} existing Portfolio pieces.`);
      console.log('Do you want to skip or overwrite? (Ctrl+C to cancel)\n');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    let addedCount = 0;
    let skippedCount = 0;

    for (const piece of portfolioPieces) {
      const slideUrl = slideUrls[piece.slideNumber];

      if (!slideUrl) {
        console.log(`❌ Slide ${piece.slideNumber} URL not found, skipping...`);
        skippedCount++;
        continue;
      }

      // Check if already exists
      const { data: existingPiece } = await supabase
        .from('pottery_pieces')
        .select('id')
        .eq('title', piece.title)
        .maybeSingle();

      if (existingPiece) {
        console.log(`⏭️  "${piece.title}" already exists, skipping...`);
        skippedCount++;
        continue;
      }

      // Prepare piece data
      const pieceData = {
        id: crypto.randomUUID(),
        title: piece.title,
        description: piece.description,
        collection: 'Portfolio',
        images: [{
          url: slideUrl,
          publicId: `m-art/portfolio-journey/${piece.slideNumber}`,
          width: 1920,
          height: 1080,
        }],
        featured: piece.featured || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Insert into database
      const { data, error} = await supabase
        .from('pottery_pieces')
        .insert([pieceData])
        .select();

      if (error) {
        console.error(`❌ Error adding "${piece.title}":`, error.message);
        skippedCount++;
      } else {
        console.log(`✅ Added "${piece.title}" (Slide ${piece.slideNumber})`);
        addedCount++;
      }
    }

    console.log('\n=== Summary ===');
    console.log(`✅ Successfully added: ${addedCount} pieces`);
    console.log(`⏭️  Skipped: ${skippedCount} pieces`);
    console.log(`📊 Total Portfolio pieces in database: ${addedCount + (existing?.length || 0)}`);

    if (addedCount > 0) {
      console.log('\n✨ Portfolio slides are now visible in the gallery!');
      console.log('   Filter by "Portfolio" collection to view them.');
    }

  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

addPortfolioSlides().then(() => {
  console.log('\n✅ Script complete!');
  process.exit(0);
});
