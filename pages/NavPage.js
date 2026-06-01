export class NavPage {
  constructor(page) {
    this.page = page;
    this.navbar = page.getByTestId('nav-bar');
    this.dashboardTab = page.getByTestId('nav-dashboard');
    this.transferTab = page.getByTestId('nav-transfer');
    this.historyTab = page.getByTestId('nav-history');
    this.logoutButton = page.getByTestId('btn-logout');
    this.userName = page.getByTestId('user-name');
  }

  async logout() {
    await this.logoutButton.click();
  }
}