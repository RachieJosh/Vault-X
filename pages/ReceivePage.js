export class ReceivePage {
  constructor(page) {
    this.page = page;
    this.receiveToggle = page.getByTestId('toggle-receive');
    this.assetSelector = page.getByTestId('select-asset');
    this.amountInput = page.getByTestId('input-amount');
    this.generateButton = page.getByTestId('btn-submit-transfer');
    this.successScreen = page.getByTestId('screen-transfer-success');
    this.txId = page.getByTestId('success-txid');
    this.successAsset = page.getByTestId('success-asset');
    this.successAmount = page.getByTestId('success-amount');
  }

  async goto() {
    if (!this.page.url().includes('/transfer')) {
      await this.page.getByTestId('nav-transfer').click();
      await this.page.waitForURL(/\/transfer/, { timeout: 10000 });
    }
    await this.receiveToggle.waitFor({ state: 'visible' });
    await this.receiveToggle.click();
    await this.generateButton.waitFor({ state: 'visible' });
  }
}
