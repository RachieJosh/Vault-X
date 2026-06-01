export class ReceivePage {
  constructor(page) {
    this.page = page;
    this.receiveToggle = page.getByTestId('toggle-receive');
    this.addressValue = page.getByTestId('receive-address-value');
    this.copyButton = page.getByTestId('btn-copy-address');
    this.assetSelector = page.getByTestId('select-asset');
  }

  async goto() {
    await this.page.goto('/transfer');
    await this.receiveToggle.click();
  }
}