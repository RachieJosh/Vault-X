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
      await this.otpInputs(i).click();
      await this.otpInputs(i).type(digits[i]);
    }

    await this.submitButton.click();
  }
}