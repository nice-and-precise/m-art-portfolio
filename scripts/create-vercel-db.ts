/**
 * Automated script to create Vercel Postgres database
 * Uses Playwright to navigate the Vercel dashboard
 */

import { chromium } from '@playwright/test';

async function createVercelDatabase() {
  console.log('🚀 Starting Vercel Postgres database creation...');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Step 1: Navigate to Vercel project
    console.log('📂 Opening Vercel project dashboard...');
    await page.goto('https://vercel.com/jordans-projects-4bff4baa/m-art-portfolio');
    await page.waitForLoadState('networkidle');

    // Wait for user to login if needed
    console.log('⏳ Waiting for authentication...');
    await page.waitForURL('**/m-art-portfolio**', { timeout: 60000 });

    // Step 2: Navigate to Storage tab
    console.log('💾 Navigating to Storage tab...');
    const storageTab = page.locator('a[href*="/storage"], button:has-text("Storage")').first();
    if (await storageTab.isVisible()) {
      await storageTab.click();
      await page.waitForLoadState('networkidle');
    } else {
      // Try direct URL
      await page.goto('https://vercel.com/jordans-projects-4bff4baa/m-art-portfolio/storage');
      await page.waitForLoadState('networkidle');
    }

    // Step 3: Click Create Database
    console.log('➕ Clicking Create Database...');
    const createButton = page.locator('button:has-text("Create Database"), a:has-text("Create Database")').first();
    await createButton.waitFor({ timeout: 10000 });
    await createButton.click();
    await page.waitForLoadState('networkidle');

    // Step 4: Select Postgres
    console.log('🐘 Selecting Postgres...');
    const postgresOption = page.locator('button:has-text("Postgres"), div:has-text("Postgres")').first();
    await postgresOption.waitFor({ timeout: 10000 });
    await postgresOption.click();
    await page.waitForTimeout(1000);

    // Step 5: Click Continue/Create
    console.log('✅ Creating database...');
    const continueButton = page.locator('button:has-text("Continue"), button:has-text("Create")').first();
    if (await continueButton.isVisible()) {
      await continueButton.click();
      await page.waitForLoadState('networkidle');
    }

    // Step 6: Accept defaults and create
    console.log('⚙️ Accepting default settings...');
    await page.waitForTimeout(2000);
    const finalCreateButton = page.locator('button:has-text("Create"), button:has-text("Create Database")').first();
    if (await finalCreateButton.isVisible()) {
      await finalCreateButton.click();
      await page.waitForLoadState('networkidle');
    }

    // Step 7: Wait for database creation
    console.log('⏳ Waiting for database to be created...');
    await page.waitForTimeout(5000);

    // Step 8: Connect to project
    console.log('🔗 Connecting database to project...');
    const connectButton = page.locator('button:has-text("Connect"), button:has-text("Connect Project")').first();
    if (await connectButton.isVisible()) {
      await connectButton.click();
      await page.waitForTimeout(1000);

      // Select project
      const projectOption = page.locator('text="m-art-portfolio"').first();
      if (await projectOption.isVisible()) {
        await projectOption.click();
        await page.waitForTimeout(500);
      }

      // Confirm connection
      const confirmButton = page.locator('button:has-text("Connect")').last();
      if (await confirmButton.isVisible()) {
        await confirmButton.click();
        await page.waitForLoadState('networkidle');
      }
    }

    console.log('✅ Database created and connected successfully!');
    console.log('📝 Next step: Run the SQL initialization script');

    // Keep browser open for SQL script execution
    console.log('\n⏸️  Browser will stay open. Press Ctrl+C when done.');
    await page.waitForTimeout(999999);

  } catch (error) {
    console.error('❌ Error creating database:', error);
    throw error;
  } finally {
    // Don't close immediately - let user see the result
    console.log('🔍 Check the browser for the database dashboard');
  }
}

createVercelDatabase().catch(console.error);
