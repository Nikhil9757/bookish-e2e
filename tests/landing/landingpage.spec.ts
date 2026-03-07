import { test, expect } from '@playwright/test';
import { landingPage } from '../../pages/landingPage';


test.describe('landing page', () => {
  let landingpage : landingPage;

test.beforeEach(async ({ page }) => {
    landingpage = new landingPage(page);
    await landingpage.goto();
  });

  test('user should see the landing page correctly', async ({ page }) => {
    await expect(landingpage.heading).toBeVisible();
    await expect(landingpage.signInLink).toBeVisible();
    await expect(landingpage.signUpLink).toBeVisible();
  });

  test('sign in navigate', async ({ page }) => {
    await landingpage.clickSignIn();
    await expect(page).toHaveURL(/signin/);
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
  });

  test('sign up navigate', async ({ page }) => {
    await landingpage.clickSignUp();
    await expect(page).toHaveURL(/signup/);
    await expect(page.getByRole('heading', { name: 'Sign Up' })).toBeVisible();
  });
});