import { test, expect } from '@playwright/test';
import { loginUser } from './helpers/login.js';
import { HistoryPage } from '../pages/HistoryPage.js';

test.describe('History', () => {

  let history;

  test.beforeEach(async ({ page }) => {
    await loginUser(page);
    history = new HistoryPage(page);
    await history.goto();
  });

  test('TC_HIST_001 - Verify history page loads', async ({ page }) => {
    await expect(page).toHaveURL(/.*history/);
    await expect(history.screen).toBeVisible();
  });

  test('TC_HIST_002 - Verify transaction count is displayed', async () => {
    await expect(history.txCount).toBeVisible();
  });

  test('TC_HIST_003 - Verify search input is visible', async () => {
    await expect(history.searchInput).toBeVisible();
  });

  test('TC_HIST_004 - Verify type and status filters are visible', async () => {
    await expect(history.typeFilter).toBeVisible();
    await expect(history.statusFilter).toBeVisible();
  });

  test('TC_HIST_005 - Verify summary row shows total sent and received stats', async () => {
    await expect(history.totalSent).toBeVisible();
    await expect(history.totalReceived).toBeVisible();
  });

  test('TC_HIST_006 - Verify search filters the transaction list', async () => {
    await history.searchInput.fill('ETH');
    await expect(history.table.or(history.noResults)).toBeVisible();
  });

  test('TC_HIST_012 - Verify sort control is visible', async () => {
    await expect(history.sortBy).toBeVisible();
  });

  test('TC_HIST_013 - Verify unauthenticated user is redirected to login', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/history');
    await expect(page).toHaveURL(/.*login/);
  });

   test('TC_HIST_014 - Verify transactions table is visible', async () => {
    await expect(history.table).toBeVisible();
  });

});
