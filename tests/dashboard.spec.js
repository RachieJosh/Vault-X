import { test, expect } from '@playwright/test';
import { loginUser } from './helpers/login.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { NavPage } from '../pages/NavPage.js';

test.describe('Dashboard', () => {

  let dashboard;
  let nav;

  test.beforeEach(async ({ page }) => {
    await loginUser(page);
    dashboard = new DashboardPage(page);
    nav = new NavPage(page);
    await dashboard.goto();
  });

  test('TC-DASH-001 - Verify portfolio total displays a value', async () => {
    await expect(dashboard.totalBalance).toBeVisible();
  });

  test('TC-DASH-002 - Verify wallet grid renders', async () => {
    await expect(dashboard.walletGrid).toBeVisible();
  });

  test('TC-DASH-003 - Verify recent transactions section is visible', async () => {
    await expect(dashboard.recentTransactions).toBeVisible();
  });

  test('TC-DASH-004 - Verify logged-in user name is displayed in nav', async () => {
    await expect(nav.userName).toBeVisible();
  });

  test('TC-DASH-005 - Verify send button goes to transfer page', async ({ page }) => {
    await dashboard.sendButton.click();
    await expect(page).toHaveURL(/.*transfer/);
  });

  test('TC-DASH-006 - Verify receive button goes to transfer page', async ({ page }) => {
    await dashboard.receiveButton.click();
    await expect(page).toHaveURL(/.*transfer/);
  });

  test('TC-DASH-007 - Verify nav bar shows all tabs', async () => {
    await expect(nav.navbar).toBeVisible();
    await expect(nav.dashboardTab).toBeVisible();
    await expect(nav.transferTab).toBeVisible();
    await expect(nav.historyTab).toBeVisible();
  });

  test('TC-DASH-008 - Verify history tab navigates to history page', async ({ page }) => {
    await nav.historyTab.click();
    await expect(page).toHaveURL(/.*history/);
  });

  test('TC-DASH-009 - Verify logout redirects to login page', async ({ page }) => {
    await nav.logoutButton.click();
    await expect(page).toHaveURL(/.*login/);
  });

  test('TC-DASH-010 - Verify unauthenticated user is redirected to login', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*login/);
  });

  test('TC-DASH-011 - Verify app handles offline API without crashing', async ({ page }) => {
    await page.route('**/api/**', route => route.abort());
    await dashboard.goto();
    await expect(dashboard.screen).toBeVisible();
  });

});
