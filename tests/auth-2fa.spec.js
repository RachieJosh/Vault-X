import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { TwoFAPage } from '../pages/TwoFAPage.js';

test.describe('Authentication - 2FA', () => {

  let twoFA;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    twoFA = new TwoFAPage(page);
    await login.goto();
    await login.login(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD);
  });

  test.only('TC-2FA-001 - Verify OTP screen renders after login', async () => {
    await expect(twoFA.screen).toBeVisible();
  });

  /**
    Still in progress
    test('TC-2FA-002 - Verify valid OTP completes login', async ({ page }) => {
    await twoFA.enterOTP(process.env.TEST_OTP);
    await twoFA.submitButton.click(); 
    await expect(page).toHaveURL(/.*dashboard/);
  });
  */


  test('TC-2FA-006 - Verify back button returns to login', async ({ page }) => {
    await twoFA.backButton.click();
    await expect(page).toHaveURL(/.*login/);
  });

  test('TC-2FA-007 - Verify wrong OTP shows error', async () => {
    await twoFA.enterOTP('000000');
    await expect(twoFA.errorMessage).toBeVisible();
  });

  test('TC-2FA-008 - Verify partial OTP shows error', async () => {
    await twoFA.otpInputs(0).fill('1');
    await twoFA.otpInputs(1).fill('2');
    await twoFA.otpInputs(2).fill('3');
    await expect(twoFA.submitButton).toBeDisabled();
  });

  /**
  A BUG  
  test('TC-2FA-012 - Verify refreshing page stays on 2FA screen', async ({ page }) => {
    await page.reload();
    await expect(twoFA.screen).toBeVisible();
  });
  */

});