import { test, expect } from '@playwright/test';
import { loginPage } from '../../pages/login';

test.describe('Signin Feature', () => {

  let LoginPage: loginPage;

  test.beforeEach(async ({ page }) => {
    LoginPage = new loginPage(page);
    await LoginPage.goto();
  });

  test('User should login successfully and land on profile page', async ({ page }) => {

    const loginHeading = LoginPage.heading;
    await expect(loginHeading).toBeVisible();

    await LoginPage.login(
      process.env.TEST_EMAIL!,
      process.env.TEST_PASSWORD!
    );

    await expect(page).toHaveURL(/profile/, { timeout: 40000 });

    const profileHeader = LoginPage.profileHeader;
    await expect(profileHeader).toBeVisible();
  });

  test('User should see error message on invalid login', async () => {

    await LoginPage.login('testuser@example.com', 'tes123');

    await expect(LoginPage.errorMessage).toBeVisible({ timeout: 20000 });

  });

});