import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load and display hero section', async ({ page }) => {
    await page.goto('/');

    // Check hero section
    await expect(page.locator('h1')).toContainText('M_ART');
    await expect(page.getByRole('link', { name: /View Gallery/i })).toBeVisible();
  });

  test('should have working parallax effect', async ({ page }) => {
    await page.goto('/');

    // Check for background images
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Verify images are loading
    const images = page.locator('img[alt*="Pottery"]');
    await expect(images.first()).toBeVisible();
  });

  test('should display featured gallery', async ({ page }) => {
    await page.goto('/');

    // Wait for featured gallery to load
    await expect(page.getByText(/Featured Pieces/i)).toBeVisible();

    // Should have at least one featured piece
    const galleryItems = page.locator('a[href="/gallery"]');
    await expect(galleryItems.first()).toBeVisible();
  });

  test('should display about section', async ({ page }) => {
    await page.goto('/');

    // About section
    await expect(page.getByText(/About the Artist/i)).toBeVisible();
    await expect(page.getByText(/Handcrafted with Passion/i)).toBeVisible();

    // Specialties - use role to be more specific
    await expect(page.getByText(/Specialties/i)).toBeVisible();
    await expect(page.getByRole('heading', { name: /Functional Pottery/i })).toBeVisible();
  });

  test('should have working CTAs', async ({ page }) => {
    await page.goto('/');

    // Test "Explore My Work" button
    const exploreButton = page.getByRole('link', { name: /Explore My Work/i });
    await expect(exploreButton).toBeVisible();
    await exploreButton.click();

    // Should navigate to gallery
    await expect(page).toHaveURL(/\/gallery/);
  });

  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Hero should be visible on mobile
    await expect(page.locator('h1')).toBeVisible();

    // Featured gallery should adapt
    await expect(page.getByText(/Featured Pieces/i)).toBeVisible();
  });
});
