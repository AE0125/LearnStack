import { test, expect } from '@playwright/test';

test.describe('Onboarding Form', () => {
  test('should display validation errors for empty submissions', async ({ page }) => {
    await page.goto('http://localhost:3000/onboarding');
    
    // If the database is not empty, it will redirect to /login. We can gracefully skip.
    if (page.url().includes('/login')) {
      console.log('Skipping onboarding test because users already exist in the database.');
      test.skip();
      return;
    }

    await page.getByRole('button', { name: 'Create Account', exact: true }).click();

    await expect(page.getByText('Name is required.')).toBeVisible();
    await expect(page.getByText('Valid email is required.')).toBeVisible();
    await expect(page.getByText('Password must be at least 8 characters.')).toBeVisible();
  });
});
