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
    await this.page.goto('/dashboard');
  }
}