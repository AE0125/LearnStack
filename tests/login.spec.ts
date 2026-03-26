import { test, expect } from '@playwright/test';

test.describe('Login Form', () => {
  test('should display validation errors for empty submissions', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    
    // Attempt to submit without filling the fields
    await page.getByRole('button', { name: 'Login', exact: true }).click();

    // Verification of zod validation messages
    await expect(page.getByText('Invalid email address.')).toBeVisible();
    await expect(page.getByText('Password is required.')).toBeVisible();
  });

  test('should display validation error for invalid email', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    
    // Fill invalid email
    await page.getByLabel('Email').fill('not-an-email');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login', exact: true }).click();

    // Check for email validation message
    await expect(page.getByText('Invalid email address.')).toBeVisible();
  });
});
