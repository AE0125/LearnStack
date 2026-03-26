import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test('should redirect unauthenticated users to login', async ({ page }) => {
    // Attempt to access dashboard without being logged in
    await page.goto('http://localhost:3000/dashboard');
    
    // Expect to be redirected to the login page
    await expect(page).toHaveURL(/.*\/login/);
  });

  // Note: For testing authenticated state with Authentik, 
  // you would typically bypass it using a cookie or test session.
  // This is a draft test for the new Active Courses feature on the Dashboard.
  /*
  test('should display active courses for authenticated user', async ({ page }) => {
    // 1. Authenticate user
    // 2. Navigate to dashboard
    await page.goto('http://localhost:3000/dashboard');
    
    // 3. Check if the Active Courses heading is visible
    await expect(page.getByRole('heading', { name: 'Active Courses' })).toBeVisible();
    
    // 4. Check if the View all link is present
    await expect(page.getByRole('link', { name: 'View all' })).toBeVisible();
    
    // 5. Ensure that the course cards are rendered (up to 4 max)
    // Here as an example we're checking for at least one card or the 'Enroll in Course' placeholder
    const cards = page.locator('.group.flex.cursor-pointer');
    await expect(cards).toHaveCountGreaterThan(0);
  });
  */
});
