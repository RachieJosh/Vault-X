export class HistoryPage {
  constructor(page) {
    this.page = page;
    this.screen = page.getByTestId('screen-history');
    this.txCount = page.getByTestId('tx-count');
    this.table = page.getByTestId('transactions-table');
    this.noResults = page.getByTestId('no-results');
    this.searchInput = page.getByTestId('input-search');
    this.typeFilter = page.getByTestId('filter-type');
    this.statusFilter = page.getByTestId('filter-status');
    this.sortBy = page.getByTestId('sort-by');
    this.summaryRow = page.getByTestId('history-summary');
    this.totalSent = page.getByTestId('stat-total-sent');
    this.totalReceived = page.getByTestId('stat-total-received');
  }

  async goto() {
    await this.page.goto('/history');
  }
}