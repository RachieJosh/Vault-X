import { test, expect } from '@playwright/test';
import { loginUser } from './helpers/login.js';
import { ReceivePage } from '../pages/ReceivePage.js';
import { SendPage } from '../pages/SendPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { HistoryPage } from '../pages/HistoryPage.js';

test.describe('Transfer - Receive', () => {

  let receive;

  test.beforeEach(async ({ page }) => {
    await loginUser(page);
    receive = new ReceivePage(page);
    await receive.goto();
  });

  test('TC_RCV_001 - Verify receive page loads', async ({ page }) => {
    await expect(page).toHaveURL(/.*transfer/);
  });

  test('TC_RCV_002 - Verify receive UI renders', async () => {
    await expect(receive.addressValue).toBeVisible();
  });

  test('TC_RCV_003 - Verify deposit address is not empty', async () => {
    const address = await receive.addressValue.textContent();
    expect(address.length).toBeGreaterThan(0);
  });

  test('TC_RCV_004 - Verify copy button copies the deposit address', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    const address = await receive.addressValue.textContent();
    await receive.copyButton.click();
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toEqual(address);
  });

  test('TC_RCV_005 - Verify switching asset changes deposit address', async () => {
    const before = await receive.addressValue.textContent();
    await receive.assetSelector.selectOption('ETH');
    const after = await receive.addressValue.textContent();
    expect(before).not.toEqual(after);
  });

  test('TC_RCV_006 - Verify submitting a receive increases wallet balance and creates a transaction in history', async ({ page }) => {
    const receiveAddress = await receive.addressValue.textContent();

    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    const initialBalanceText = await dashboard.totalBalance.innerText();
    const initialBalance = parseFloat(initialBalanceText.replace(/[^0-9.]/g, ''));

    const history = new HistoryPage(page);
    await history.goto();
    const initialCountText = await history.txCount.innerText();
    const initialCount = parseInt(initialCountText, 10);

    const send = new SendPage(page);
    await send.goto();
    await send.sendFunds(receiveAddress, 0.01);
    await expect(send.successScreen).toBeVisible({ timeout: 30000 });

    await dashboard.goto();
    const newBalanceText = await dashboard.totalBalance.innerText();
    const newBalance = parseFloat(newBalanceText.replace(/[^0-9.]/g, ''));
    expect(newBalance).toBeGreaterThan(initialBalance);

    await history.goto();
    const newCountText = await history.txCount.innerText();
    const newCount = parseInt(newCountText, 10);
    expect(newCount).toBeGreaterThan(initialCount);
  });

});