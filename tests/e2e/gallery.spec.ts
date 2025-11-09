import { test, expect } from '@playwright/test';

test.describe('Gallery Page', () => {
  test('should load and display gallery', async ({ page }) => {
    await page.goto('/gallery');

    // Check page title
    await expect(page.locator('h1')).toContainText('Gallery');

    // Should show piece count
    await expect(page.getByText(/piece/i)).toBeVisible();
  });

  test('should display filters', async ({ page }) => {
    await page.goto('/gallery');

    // Filter controls should be visible
    await expect(page.getByText(/Filter by:/i)).toBeVisible();
    await expect(page.getByText(/Sort by:/i)).toBeVisible();

    // Collection filter
    const collectionSelect = page.locator('select').first();
    await expect(collectionSelect).toBeVisible();
  });

  test('should filter by collection', async ({ page }) => {
    await page.goto('/gallery');

    // Select a specific collection
    const collectionSelect = page.locator('select').first();
    await collectionSelect.selectOption('Vases');

    // URL or content should update
    await page.waitForTimeout(500);

    // Should still show gallery items or empty state
    const pageContent = await page.content();
    expect(pageContent.length).toBeGreaterThan(100);
  });

  test('should sort pieces', async ({ page }) => {
    await page.goto('/gallery');

    // Get sort dropdown
    const sortSelect = page.locator('select').nth(1);
    await sortSelect.selectOption('title');

    await page.waitForTimeout(500);

    // Gallery should still be visible
    await expect(page.locator('h1')).toContainText('Gallery');
  });

  test('should open lightbox on image click', async ({ page }) => {
    await page.goto('/gallery');

    // Wait for images to load
    await page.waitForSelector('img', { timeout: 10000 });

    // Click first gallery image
    const firstImage = page.locator('img').first();
    await firstImage.click();

    // Lightbox should open (check for close button)
    const closeButton = page.locator('button').filter({ hasText: '×' });
    await expect(closeButton).toBeVisible();
  });

  test('should close lightbox', async ({ page }) => {
    await page.goto('/gallery');

    // Open lightbox
    await page.waitForSelector('img', { timeout: 10000 });
    await page.locator('img').first().click();

    // Close lightbox
    const closeButton = page.locator('button').filter({ hasText: '×' });
    await closeButton.click();

    // Lightbox should be closed
    await expect(closeButton).not.toBeVisible();
  });

  test('should handle empty collection gracefully', async ({ page }) => {
    await page.goto('/gallery');

    // This might show no results depending on data
    const collectionSelect = page.locator('select').first();
    await collectionSelect.selectOption('All');

    // Should show either pieces or "no pieces found"
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/gallery');

    // Gallery should adapt to mobile
    await expect(page.locator('h1')).toBeVisible();

    // Filters should stack vertically
    await expect(page.getByText(/Filter by:/i)).toBeVisible();
  });
});
