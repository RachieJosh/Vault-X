export class SendPage {
  constructor(page) {
    this.page = page;
    this.sendToggle = page.getByTestId('toggle-send');
    this.assetSelector = page.getByTestId('select-asset');
    this.amountInput = page.getByTestId('input-amount');
    this.addressInput = page.getByTestId('input-address');
    this.noteInput = page.getByTestId('input-note');
    this.submitButton = page.getByTestId('btn-submit-transfer');
    this.backButton = page.getByRole('button', { name: '← Back' });
    this.errorAmount = page.getByTestId('error-amount');
    this.errorAddress = page.getByTestId('error-address');
    this.successScreen = page.getByTestId('screen-transfer-success');
  }

  async goto() {
    if (!this.page.url().includes('/transfer')) {
      await this.page.getByTestId('nav-transfer').click();
      await this.page.waitForURL(/\/transfer/, { timeout: 10000 });
    }
    await this.sendToggle.waitFor({ state: 'visible' });
    await this.sendToggle.click();
  }

  async sendFunds(address, amount) {
    await this.addressInput.fill(address);
    await this.amountInput.fill(String(amount));
    await this.submitButton.click();
  }
}