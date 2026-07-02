import { test, expect } from '@playwright/test';
import { loginUser } from './helpers/login.js';
import { ReceivePage } from '../pages/ReceivePage.js';
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
    await expect(receive.generateButton).toBeVisible();
    await expect(receive.assetSelector).toBeVisible();
  });

  // Serialized: these all generate real receive requests against the same shared wallet/history.
  test.describe.serial('wallet-mutating', () => {

    test('TC_RCV_003 - Verify generating a receive request returns a transaction ID', async () => {
      await receive.amountInput.fill('0.1');
      await receive.generateButton.click();
      await expect(receive.successScreen).toBeVisible({ timeout: 15000 });
      const txId = await receive.txId.textContent();
      expect(txId.trim().length).toBeGreaterThan(0);
    });

    test('TC_RCV_004 - Verify receive success screen shows the submitted amount', async () => {
      await receive.amountInput.fill('0.25');
      await receive.generateButton.click();
      await expect(receive.successScreen).toBeVisible({ timeout: 15000 });
      await expect(receive.successAmount).toContainText('0.25');
    });

    test('TC_RCV_005 - Verify switching asset is reflected on the success screen', async () => {
      await receive.assetSelector.selectOption('ETH');
      await receive.amountInput.fill('0.1');
      await receive.generateButton.click();
      await expect(receive.successScreen).toBeVisible({ timeout: 15000 });
      await expect(receive.successAsset).toHaveText('ETH');
    });

    test('TC_RCV_006 - Verify submitting a receive request creates a transaction in history', async ({ page }) => {
      const history = new HistoryPage(page);
      await history.goto();
      const initialCountText = await history.txCount.innerText();
      const initialCount = parseInt(initialCountText, 10);

      await receive.goto();
      await receive.amountInput.fill('0.01');
      await receive.generateButton.click();
      await expect(receive.successScreen).toBeVisible({ timeout: 15000 });

      await history.goto();
      const newCountText = await history.txCount.innerText();
      const newCount = parseInt(newCountText, 10);
      expect(newCount).toBeGreaterThan(initialCount);
    });

  });

});
