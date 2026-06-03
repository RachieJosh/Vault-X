import { expect } from '@playwright/test';

export class TwoFAPage {
  constructor(page) {
    this.page = page;
    this.screen = page.getByRole('heading', { name: 'Two-Factor Auth' });
    this.otpInputs = (i) => page.getByTestId(`otp-input-${i}`);
    this.submitButton = page.getByTestId('btn-verify-2fa');
    this.errorMessage = page.getByTestId('error-2fa');
    this.backButton = page.getByTestId('btn-back-login');
  }

  async enterOTP(otp) {
    const digits = String(otp).trim().split('').slice(0, 6);

    for (let i = 0; i < 6; i++) {
      const input = this.otpInputs(i);
      await input.waitFor({ state: 'visible' });
      await input.click();
      await input.pressSequentially(digits[i], { delay: 50 });
    }

    for (let i = 0; i < 6; i++) {
      await expect(this.otpInputs(i)).toHaveValue(digits[i]);
    }

    await this.submitButton.waitFor({ state: 'visible' });
    await expect(this.submitButton).toBeEnabled({ timeout: 5000 });
    await this.submitButton.click();
  }
}