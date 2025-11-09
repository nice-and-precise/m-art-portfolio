// Upload Canva slides to Cloudinary
// Usage: node scripts/upload-canva-slides.js

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CANVA_DIR = path.join(__dirname, '..', 'M_Canva');
const CLOUDINARY_FOLDER = 'm-art/portfolio-journey';

async function uploadImage(filename) {
  const filePath = path.join(CANVA_DIR, filename);

  try {
    console.log(`Uploading ${filename}...`);

    const result = await cloudinary.uploader.upload(filePath, {
      folder: CLOUDINARY_FOLDER,
      public_id: filename.replace('.png', ''),
      resource_type: 'image',
      overwrite: true,
    });

    console.log(`✓ ${filename} uploaded successfully`);
    console.log(`  URL: ${result.secure_url}`);

    return result;
  } catch (error) {
    console.error(`✗ Failed to upload ${filename}:`, error.message);
    throw error;
  }
}

async function main() {
  console.log('Starting Canva slides upload to Cloudinary...\n');
  console.log(`Source: ${CANVA_DIR}`);
  console.log(`Destination: ${CLOUDINARY_FOLDER}\n`);

  // Upload all 10 slides
  const results = {};

  for (let i = 1; i <= 10; i++) {
    const filename = `${i}.png`;
    try {
      const result = await uploadImage(filename);
      results[i] = result.secure_url;
    } catch (error) {
      console.error(`Failed to upload slide ${i}`);
      process.exit(1);
    }
  }

  console.log('\n=== Upload Complete ===');
  console.log('All slides uploaded successfully!\n');

  // Save URLs to a reference file
  const urlsFile = path.join(__dirname, '..', 'data', 'canva-slide-urls.json');
  fs.writeFileSync(urlsFile, JSON.stringify(results, null, 2));
  console.log(`URLs saved to: ${urlsFile}\n`);

  // Print summary
  console.log('Image URLs:');
  Object.entries(results).forEach(([slideNum, url]) => {
    console.log(`  Slide ${slideNum}: ${url}`);
  });
}

main().catch(error => {
  console.error('Upload failed:', error);
  process.exit(1);
});
