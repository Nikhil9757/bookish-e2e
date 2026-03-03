import { test, expect } from '@playwright/test';

test.describe('Signin Feature', () => {

test.beforeEach(async ({ page }) => {
    await page.goto('/signin');
  });

  test('User should login successfully and land on profile page', async ({ page }) => {
    const loginHeading = page.getByRole('heading', { name: 'Sign In' });
    await expect(loginHeading).toBeVisible();

    await page.getByPlaceholder('Email').fill(process.env.TEST_EMAIL!);
    await page.getByPlaceholder('Password').fill(process.env.TEST_PASSWORD!);

    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page).toHaveURL(/profile/, { timeout: 30000 });

    const profileHeader = page.getByRole('heading', { name: 'User Profile' });
    await expect(profileHeader).toBeVisible();
  });

  test('User should see error message on invalid login', async ({ page }) => {
    await page.getByPlaceholder('Email').fill('testuser@example.com');
    await page.getByPlaceholder('Password').fill('tes123');

    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page.getByText('Incorrect Email and Password.')).toBeVisible({ timeout: 20000 });
  }) 
});