import { LoginPage } from '../../pages/LoginPage.js';
import { TwoFAPage } from '../../pages/TwoFAPage.js';

export async function loginUser(page) {
  const loginPage = new LoginPage(page);
  const twoFAPage = new TwoFAPage(page);

  await loginPage.goto();

  await loginPage.login(
    process.env.TEST_USER_EMAIL,
    process.env.TEST_USER_PASSWORD
  );

  await twoFAPage.screen.waitFor({ state: 'visible' });

  await twoFAPage.enterOTP(process.env.TEST_OTP_SECRET);

  await page.waitForURL(/dashboard|home|transfer/, { timeout: 20000 });
}