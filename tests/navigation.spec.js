import { test, expect } from '@playwright/test';
import { loginUser } from './helpers/login.js';
import { NavPage } from '../pages/NavPage.js';

test.describe('Navigation & Session', () => {

  let nav;

  test.beforeEach(async ({ page }) => {
    await loginUser(page);
    nav = new NavPage(page);
  });

  test('TC_NAV_001 - Verify navbar renders after login', async () => {
    await expect(nav.navbar).toBeVisible();
    await expect(nav.userName).toBeVisible();
  });

  test('TC_NAV_002 - Verify clicking history tab updates URL', async ({ page }) => {
    await nav.historyTab.click();
    await expect(page).toHaveURL(/.*history/);
  });

  test('TC_NAV_005 - Verify logout redirects to login', async ({ page }) => {
    await nav.logout();
    await expect(page).toHaveURL(/.*login/);
  });

  test('TC_NAV_007 - Verify dashboard redirects to login after logout', async ({ page }) => {
    await nav.logout();
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*login/);
  });

  test('TC_NAV_008 - Verify transfer redirects to login after logout', async ({ page }) => {
    await nav.logout();
    await page.goto('/transfer');
    await expect(page).toHaveURL(/.*login/);
  });

  test('TC_NAV_009 - Verify history redirects to login after logout', async ({ page }) => {
    await nav.logout();
    await page.goto('/history');
    await expect(page).toHaveURL(/.*login/);
  });

  test('TC_NAV_010 - Verify back button after logout stays on login', async ({ page }) => {
    await nav.logout();
    await page.goBack();
    await expect(page).toHaveURL(/.*login/);
  });

  test('TC_NAV_011 - Verify all protected routes redirect after logout', async ({ page }) => {
    await nav.logout();
    for (const route of ['/dashboard', '/transfer', '/history']) {
      await page.goto(route);
      await expect(page).toHaveURL(/.*login/);
    }
  });

});