export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByTestId('input-email');
    this.passwordInput = page.getByTestId('input-password');
    this.submitButton = page.getByTestId('btn-login');
    this.errorMessage = page.getByTestId('error-login');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}