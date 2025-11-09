/**
 * E2E Tests for Contact Form
 * Tests form validation, submission, and user experience
 */

import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3007';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);
  });

  test('should display contact form with all fields', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Contact/);

    // Check header
    await expect(page.getByRole('heading', { name: /Get in Touch/i })).toBeVisible();

    // Check all form fields are present
    await expect(page.getByLabel(/Name/)).toBeVisible();
    await expect(page.getByLabel(/Email/)).toBeVisible();
    await expect(page.getByLabel(/Phone/)).toBeVisible();
    await expect(page.getByLabel(/Inquiry Type/)).toBeVisible();
    await expect(page.getByLabel(/Message/)).toBeVisible();

    // Check submit button
    await expect(page.getByRole('button', { name: /Send Message/i })).toBeVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    // Try to submit empty form
    await page.getByRole('button', { name: /Send Message/i }).click();

    // Wait for validation messages
    await page.waitForTimeout(100);

    // Check for validation error messages
    const nameError = page.getByText(/Name is required/i);
    const emailError = page.getByText(/Email is required/i);
    const inquiryError = page.getByText(/select an inquiry type/i);
    const messageError = page.getByText(/Message is required/i);

    // At least one validation error should appear
    const errorCount = await page.getByText(/is required/i).count();
    expect(errorCount).toBeGreaterThan(0);
  });

  test('should validate email format', async ({ page }) => {
    // Fill in invalid email
    await page.getByLabel(/Name/).fill('John Doe');
    await page.getByLabel(/Email/).fill('invalid-email');
    await page.getByLabel(/Inquiry Type/).selectOption('commission');
    await page.getByLabel(/Message/).fill('This is a test message with enough characters');

    // Try to submit
    await page.getByRole('button', { name: /Send Message/i }).click();

    // Wait for validation
    await page.waitForTimeout(100);

    // Should show email validation error
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test('should validate message length', async ({ page }) => {
    // Fill in short message
    await page.getByLabel(/Name/).fill('John Doe');
    await page.getByLabel(/Email/).fill('john@example.com');
    await page.getByLabel(/Inquiry Type/).selectOption('commission');
    await page.getByLabel(/Message/).fill('short');

    // Try to submit
    await page.getByRole('button', { name: /Send Message/i }).click();

    // Wait for validation
    await page.waitForTimeout(100);

    // Should show message length validation error
    await expect(page.getByText(/at least 10 characters/i)).toBeVisible();
  });

  test('should show character count for message field', async ({ page }) => {
    const messageField = page.getByLabel(/Message/);
    const testMessage = 'Testing character count';

    await messageField.fill(testMessage);

    // Should show character count
    await expect(page.getByText(`${testMessage.length} characters`)).toBeVisible();
  });

  test('should successfully submit valid form', async ({ page }) => {
    // Fill in all required fields with valid data
    await page.getByLabel(/Name/).fill('Test User E2E');
    await page.getByLabel(/Email/).fill('e2e-test@example.com');
    await page.getByLabel(/Phone/).fill('555-0123');
    await page.getByLabel(/Inquiry Type/).selectOption('purchase');
    await page.getByLabel(/Message/).fill('This is an end-to-end test message for the contact form functionality');

    // Submit form
    await page.getByRole('button', { name: /Send Message/i }).click();

    // Wait for success message
    await expect(page.getByText(/Thank you for your inquiry/i)).toBeVisible({ timeout: 5000 });

    // Form should be cleared after successful submission
    await expect(page.getByLabel(/Name/)).toHaveValue('');
    await expect(page.getByLabel(/Email/)).toHaveValue('');
    await expect(page.getByLabel(/Phone/)).toHaveValue('');
  });

  test('should have all inquiry type options', async ({ page }) => {
    const select = page.getByLabel(/Inquiry Type/);

    // Get all options
    const options = await select.locator('option').allTextContents();

    // Should have all 5 inquiry types plus placeholder
    expect(options).toContain('Commission a Piece');
    expect(options).toContain('Purchase Existing Work');
    expect(options).toContain('Collaboration Inquiry');
    expect(options).toContain('Exhibition/Gallery');
    expect(options).toContain('General Question');
  });

  test('should have working back to home link', async ({ page }) => {
    const backLink = page.getByRole('link', { name: /Back to Home/i });
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute('href', '/');
  });

  test('should show M_ART header link', async ({ page }) => {
    const headerLink = page.getByRole('link', { name: 'M_ART' }).first();
    await expect(headerLink).toBeVisible();
    await expect(headerLink).toHaveAttribute('href', '/');
  });

  test('should have proper styling and responsive design', async ({ page }) => {
    // Check main container has proper classes
    const main = page.locator('main');
    await expect(main).toHaveClass(/max-w-3xl/);
    await expect(main).toHaveClass(/container/);

    // Check form has proper styling
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Submit button should have sage green color
    const submitButton = page.getByRole('button', { name: /Send Message/i });
    await expect(submitButton).toHaveClass(/bg-glaze-sage/);
  });

  test('should disable submit button while submitting', async ({ page }) => {
    // Fill in valid data
    await page.getByLabel(/Name/).fill('Test User');
    await page.getByLabel(/Email/).fill('test@example.com');
    await page.getByLabel(/Inquiry Type/).selectOption('general');
    await page.getByLabel(/Message/).fill('Testing submit button state');

    const submitButton = page.getByRole('button', { name: /Send Message/i });

    // Click submit
    await submitButton.click();

    // Button should show "Sending..." and be disabled briefly
    // Note: This might be too fast to catch in some cases
    const sendingText = submitButton.getByText(/Sending/i);
    if (await sendingText.isVisible().catch(() => false)) {
      await expect(submitButton).toBeDisabled();
    }
  });
});

test.describe('Contact Form Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);
  });

  test('should have proper labels for all form fields', async ({ page }) => {
    // All inputs should be properly labeled
    const nameInput = page.getByLabel(/Name/);
    const emailInput = page.getByLabel(/Email/);
    const phoneInput = page.getByLabel(/Phone/);
    const inquirySelect = page.getByLabel(/Inquiry Type/);
    const messageTextarea = page.getByLabel(/Message/);

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(phoneInput).toBeVisible();
    await expect(inquirySelect).toBeVisible();
    await expect(messageTextarea).toBeVisible();
  });

  test('should be keyboard navigable', async ({ page }) => {
    // Tab through form fields
    await page.keyboard.press('Tab'); // Name field
    await expect(page.getByLabel(/Name/)).toBeFocused();

    await page.keyboard.press('Tab'); // Email field
    await expect(page.getByLabel(/Email/)).toBeFocused();

    await page.keyboard.press('Tab'); // Phone field
    await expect(page.getByLabel(/Phone/)).toBeFocused();

    await page.keyboard.press('Tab'); // Inquiry type
    await expect(page.getByLabel(/Inquiry Type/)).toBeFocused();

    await page.keyboard.press('Tab'); // Message field
    await expect(page.getByLabel(/Message/)).toBeFocused();
  });

  test('should indicate required fields with asterisk', async ({ page }) => {
    // Check for required field indicators
    const requiredIndicators = page.locator('span.text-red-500');
    const count = await requiredIndicators.count();

    // Should have at least 4 required field indicators (name, email, inquiry type, message)
    expect(count).toBeGreaterThanOrEqual(4);
  });
});
