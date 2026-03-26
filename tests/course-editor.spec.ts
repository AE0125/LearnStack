import { test, expect } from '@playwright/test';

test.describe('Course Editor Module', () => {
  test('should display unauthorized message or redirect if not logged in', async ({ page }) => {
    // Attempt to access the new course page without being authenticated
    await page.goto('http://localhost:3000/dashboard/courses/new');
    
    // Unauthenticated users should be redirected to login
    await expect(page).toHaveURL(/.*\/login/);
  });

  // Example of how the test for an authenticated TUTOR would look like
  /*
  test('Tutor can create a new course using the Slate Editor', async ({ page }) => {
    // 1. Authenticate as TUTOR
    // 2. Navigate to /dashboard/courses/new
    await page.goto('http://localhost:3000/dashboard/courses/new');
    
    // 3. Verify Page title
    await expect(page.getByRole('heading', { name: 'Neuen Kurs erstellen' })).toBeVisible();
    
    // 4. Fill in course details
    await page.getByLabel(/Kurs-Name/i).fill('Modern Web Development');
    await page.getByLabel(/Kurs-Kürzel/i).fill('WEB-101');
    await page.getByLabel(/Länge/i).fill('12 Wochen');
    
    // 5. Interact with Slate.js Editor 
    // Slate contenteditable div
    const editor = page.locator('.prose[contenteditable="true"]');
    await editor.click();
    await editor.fill('Willkommen zum neuen Kurs!');
    
    // Apply bold formatting using the toolbar
    await page.getByRole('button', { name: /bold/i }).click();

    // 6. Submit the form
    await page.getByRole('button', { name: /Kurs erstellen/i }).click();

    // 7. Verify redirection to courses page
    await expect(page).toHaveURL(/.*\/dashboard\/courses/);
  });
  */
});
