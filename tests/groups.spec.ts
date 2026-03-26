import { test, expect } from '@playwright/test';

test.describe('Groups Management', () => {
  test('should load the groups page and show the elements', async ({ page }) => {
    // Assuming the user is already authenticated via state/fixture or needs to login.
    // For this generic test, we navigate manually. Playwright config usually handles auth state.
    await page.goto('/dashboard/groups');

    // Check title
    await expect(page.locator('h1')).toContainText('Groups');

    // Check left column "New Group"
    await expect(page.getByText('New Group')).toBeVisible();

    // Check right column "All Groups"
    await expect(page.getByText('All Groups')).toBeVisible();

    // Ensure the table headers exist
    await expect(page.getByRole('columnheader', { name: 'Group Code' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Members' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Created' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Actions' })).toBeVisible();
  });
});
