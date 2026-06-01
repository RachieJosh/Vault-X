export class SendPage {
  constructor(page) {
    this.page = page;
    this.sendToggle = page.getByTestId('toggle-send');
    this.assetSelector = page.getByTestId('select-asset');
    this.amountInput = page.getByTestId('input-amount');
    this.addressInput = page.getByTestId('input-address');
    this.submitButton = page.getByTestId('btn-submit-transfer');
    this.errorAmount = page.getByTestId('error-amount');
    this.errorAddress = page.getByTestId('error-address');
    this.successScreen = page.getByTestId('screen-transfer-success');
  }

  async goto() {
    await this.page.goto('/transfer');
    await this.sendToggle.click();
  }

  async sendFunds(address, amount) {
    await this.addressInput.fill(address);
    await this.amountInput.fill(String(amount));
    await this.submitButton.click();
  }
}