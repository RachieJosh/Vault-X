import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { TwoFAPage } from '../pages/TwoFAPage.js';

test.describe('Authentication - Login', () => {

  let login;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.goto();
  });

  test('TC_LOGIN_001 - Login page loads', async ({ page }) => {
    await expect(page).toHaveURL(/.*login/);
    await expect(login.emailInput).toBeVisible();
  });

  test('TC_LOGIN_002 - Valid credentials redirect to 2FA screen', async ({ page }) => {
    await login.login(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD);
    const twoFA = new TwoFAPage(page);
    await expect(twoFA.screen).toBeVisible();
  });

  test('TC_LOGIN_004 - Wrong password shows error', async () => {
    await login.login(process.env.TEST_USER_EMAIL, 'wrongpassword');
    await expect(login.errorMessage).toBeVisible();
  });

  test('TC_LOGIN_006 - Empty form shows error', async () => {
    await login.submitButton.click();

    const email = login.emailInput;
    const validationMessage = await email.evaluate(
      (el) => el.validationMessage
    );
    expect(validationMessage).toMatch(/fill out|fill in|required/i);
  });

});