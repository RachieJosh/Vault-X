export class ReceivePage {
  constructor(page) {
    this.page = page;
    this.receiveToggle = page.getByTestId('toggle-receive');
    this.addressValue = page.getByTestId('receive-address-value');
    this.copyButton = page.getByTestId('btn-copy-address');
    this.assetSelector = page.getByTestId('select-asset');
  }

  async goto() {
    if (!this.page.url().includes('/transfer')) {
      await this.page.getByTestId('nav-transfer').click();
      await this.page.waitForURL(/\/transfer/, { timeout: 10000 });
    }
    await this.receiveToggle.waitFor({ state: 'visible' });
    await this.receiveToggle.click();
  }
}