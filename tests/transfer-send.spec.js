import { test, expect } from '@playwright/test';
import { loginUser } from './helpers/login.js';
import { SendPage } from '../pages/SendPage.js';

test.describe('Transfer - Send', () => {

  let send;

  test.beforeEach(async ({ page }) => {
    await loginUser(page);
    send = new SendPage(page);
    await send.goto();
  });

  test('TC_SEND_001 - Verify send tab loads correctly', async ({ page }) => {
    await expect(page).toHaveURL(/.*transfer/);
  });

  test('TC_SEND_002 - Verify asset selector is visible', async () => {
    await expect(send.assetSelector).toBeVisible();
  });

  test('TC_SEND_003 - Verify amount input, address input and submit button are visible', async () => {
    await expect(send.amountInput).toBeVisible();
    await expect(send.addressInput).toBeVisible();
    await expect(send.submitButton).toBeVisible();
  });

  test('TC_SEND_004 - Verify valid send completes and shows success screen', async () => {
    await send.sendFunds(process.env.TEST_RECIPIENT_ADDRESS, 0.1);
    await expect(send.successScreen).toBeVisible({ timeout: 30000 });
  });

  test('TC_SEND_005 - Verify asset selector contains multiple assets', async () => {
    const options = await send.assetSelector.locator('option').count();
    expect(options).toBeGreaterThan(1);
  });

  test('TC_SEND_006 - Verify note field is visible', async () => {
    await expect(send.noteInput).toBeVisible();
  });

  test('TC_SEND_007 - Verify back button navigates away from transfer', async ({ page }) => {
    await send.backButton.click();
    await expect(page).not.toHaveURL(/.*transfer/);
  });

  test('TC_SEND_008 - Verify exceeding balance shows amount error', async () => {
    await send.sendFunds(process.env.TEST_RECIPIENT_ADDRESS, 999999999);
    await expect(send.errorAmount).toBeVisible();
  });

  test('TC_SEND_009 - Verify missing address shows address error', async () => {
    await send.amountInput.fill('0.001');
    await send.submitButton.click();
    await expect(send.errorAddress).toBeVisible();
  });

  test('TC_SEND_010 - Verify switching to receive tab shows wallet address', async ({ page }) => {
    await page.getByTestId('toggle-receive').click();
    await expect(page.getByTestId('receive-address-value')).toBeVisible();
  });

  test('TC_SEND_011 - Verify zero amount shows error', async () => {
    await send.sendFunds(process.env.TEST_RECIPIENT_ADDRESS, 0);
    await expect(send.errorAmount).toBeVisible();
  });

  test('TC_SEND_012 - Verify negative amount shows error', async () => {
    await send.sendFunds(process.env.TEST_RECIPIENT_ADDRESS, -50);
    await expect(send.errorAmount).toBeVisible();
  });

});
