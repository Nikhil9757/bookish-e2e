import { test, expect } from '@playwright/test';

test.describe('Signup Feature', () => {

test.beforeEach(async ({ page }) => {
    await page.goto('/signup');
  });

  test('User should be able to sign up successfully', async ({ page }) => {

    const signupHeading = page.getByRole("heading", { name: "Sign Up" });
    await expect(signupHeading).toBeVisible();


    const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

    await page.getByPlaceholder('Name').fill(`TestUser${uniqueId}`);
    await page.getByPlaceholder('Email').fill(`testuser${uniqueId}@example.com`);
    await page.getByPlaceholder('Password', { exact: true }).fill('Password@123');
    await page.getByPlaceholder('Repeat your password').fill('Password@123');
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.getByText('Registration Successful! Redirecting...')).toBeVisible({ timeout: 20000 });
  });

  test('User already exist', async ({ page}) => {

    const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    await page.getByPlaceholder('Name').fill(`TestUser${uniqueId}`);
    await page.getByPlaceholder('Email').fill(process.env.TEST_EMAIL!);
    await page.getByPlaceholder('Password', { exact: true }).fill(process.env.TEST_PASSWORD!);
    await page.getByPlaceholder('Repeat your password').fill(process.env.TEST_PASSWORD!);
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.getByText('User already exists with this email.')).toBeVisible({ timeout: 20000 });
  });

});