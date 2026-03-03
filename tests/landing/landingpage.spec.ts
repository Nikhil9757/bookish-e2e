import { test, expect } from '@playwright/test';

test.describe('landing page', () => {

test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('user should see the landing page correctly', async ({ page }) => {
    const landingHeading = page.getByRole('heading', { name: 'Welcome to Bookish'});
    await expect(landingHeading).toBeVisible();

    const signinLink = page.getByRole('link', { name: 'Sign In'});
    await expect(signinLink).toBeVisible();
     
    const signupLink = page.getByRole('link', { name: 'Create Account'});
    await expect(signupLink).toBeVisible();
  });

  test('sign in navigate', async ({ page }) => {
    await page.getByRole('link', { name: 'Sign In'}).click();
    await expect(page).toHaveURL(/signin/);
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
  });

  test('sign up navigate', async ({ page }) => {
    await page.getByRole('link', { name: 'Create Account'}).click();
    await expect(page).toHaveURL(/signup/);
    await expect(page.getByRole('heading', { name: 'Sign Up' })).toBeVisible();
  });
});