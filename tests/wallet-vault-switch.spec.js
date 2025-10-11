// Test wallet/vault dropdown switching
const { test, expect } = require('@playwright/test');

test('should switch between Wallet and Vault views', async ({ page }) => {
  await page.goto('/approve-spending.html');
  
  // Check initial wallet view
  await expect(page.locator('#balanceLabel')).toContainText('Wallet Balance');
  await expect(page.locator('#balanceAmount')).toContainText('$1,036');
  
  // Check wallet assets are visible
  await expect(page.locator('text=ETH').first()).toBeVisible();
  await expect(page.locator('text=BNB')).toBeVisible();
  
  // Take screenshot of wallet view
  await page.screenshot({ 
    path: 'test-results/wallet-view.png',
    fullPage: true 
  });
  
  console.log('✅ Wallet view loaded');
  
  // Switch to Vault
  await page.selectOption('#viewSelector', 'vault');
  await page.waitForTimeout(200);
  
  // Check vault balance updated
  await expect(page.locator('#balanceLabel')).toContainText('Vault Balance');
  await expect(page.locator('#balanceAmount')).toContainText('$45,892');
  
  // Check vault assets are visible
  await expect(page.locator('text=liquidUSD')).toBeVisible();
  await expect(page.locator('text=BTC')).toBeVisible();
  
  // Check vault info message
  await expect(page.locator('text=Your assets are securely stored')).toBeVisible();
  
  // Take screenshot of vault view
  await page.screenshot({ 
    path: 'test-results/vault-view.png',
    fullPage: true 
  });
  
  console.log('✅ Vault view loaded');
  console.log('✅ Dropdown switching works perfectly');
  
  // Switch back to Wallet
  await page.selectOption('#viewSelector', 'wallet');
  await page.waitForTimeout(200);
  
  // Verify wallet view restored
  await expect(page.locator('#balanceAmount')).toContainText('$1,036');
  await expect(page.locator('text=BNB')).toBeVisible();
  
  console.log('✅ Switch back to wallet successful');
});





