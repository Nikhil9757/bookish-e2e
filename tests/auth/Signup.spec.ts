import { test, expect } from '@playwright/test';
import { signupPage} from '../../pages/signup';

test.describe('Signup Feature', () => {

  let signup: signupPage;
  test.beforeEach(async ({ page }) => {
    signup = new signupPage(page);
    await signup.goto();
  });

  test('User should be able to sign up successfully', async ({ page }) => {

    const signupHeading = signup.heading
    await expect(signupHeading).toBeVisible();


    const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

    await signup.signup(`TestUser${uniqueId}`, `testuser${uniqueId}@example.com`, 'Password@123', 'Password@123');

    await expect(signup.successMessage).toBeVisible({ timeout: 20000 });
  });

  test('User already exist', async ({ page}) => {

    const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    await signup.signup(`TestUser${uniqueId}`, process.env.TEST_EMAIL!, 'Password@123', 'Password@123');

   await expect(signup.errormessage)
      .toBeVisible({ timeout: 20000 });
  });

});