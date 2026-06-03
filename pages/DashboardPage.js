export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.screen = page.getByTestId('screen-dashboard');
    this.totalBalance = page.getByTestId('total-balance-usd');
    this.walletGrid = page.getByTestId('wallet-grid');
    this.recentTransactions = page.getByTestId('recent-transactions');
    this.sendButton = page.getByTestId('btn-goto-send');
    this.receiveButton = page.getByTestId('btn-goto-receive');
  }

  async goto() {
    if (!this.page.url().includes('/dashboard')) {
      await this.page.getByTestId('nav-dashboard').click();
      await this.page.waitForURL(/\/dashboard/, { timeout: 10000 });
    }
    await this.screen.waitFor({ state: 'visible' });
  }
}