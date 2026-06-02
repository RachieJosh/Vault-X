import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

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

  test('TC_LOGIN_002 - Valid credentials redirect away from login', async ({ page }) => {
    await login.login(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD);
    await expect(page).toHaveURL(/.*login/);
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
  expect(validationMessage).toBe('Please fill in this field.');
});

  test('TC_LOGIN_010 - Logged-in user redirected away from login page', async ({ page }) => {
    await login.login(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD);
    await page.goto('/login');
    await expect(page).toHaveURL(/.*login/);
  });
});