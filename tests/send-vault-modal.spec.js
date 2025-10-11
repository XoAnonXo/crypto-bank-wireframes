// Test Send to Vault modal
const { test, expect } = require('@playwright/test');

test.describe('Send to Vault Modal', () => {
  test('should open Send modal when clicking Send to Vault', async ({ page }) => {
    await page.goto('/approve-spending.html');
    
    // Expand first ETH item
    await page.locator('#eth-1 .use-btn').click();
    await page.waitForTimeout(200);
    
    // Click Send to Vault
    await page.locator('#eth-1 .send-btn').click();
    await page.waitForTimeout(200);
    
    // Modal should be visible
    const modal = await page.locator('#sendModal');
    await expect(modal).toHaveClass(/show/);
    
    // Check modal content
    await expect(page.locator('#sendModal .modal-header')).toContainText('Send to Vault');
    await expect(page.locator('#sendTokenName')).toContainText('ETH');
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/send-vault-modal-open.png',
      fullPage: false 
    });
    
    console.log('✅ Send to Vault modal opens correctly');
  });

  test('should show success message when sending', async ({ page }) => {
    await page.goto('/approve-spending.html');
    
    // Open send modal
    await page.locator('#eth-1 .use-btn').click();
    await page.locator('#eth-1 .send-btn').click();
    await page.waitForTimeout(200);
    
    // Enter amount
    await page.locator('#sendAmountInput').fill('100');
    await page.waitForTimeout(100);
    
    // Click Send
    await page.locator('#sendBtn').click();
    await page.waitForTimeout(100);
    
    // Button text should change
    await expect(page.locator('#sendBtn')).toContainText('Send transaction requested');
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/send-vault-success.png',
      fullPage: false 
    });
    
    console.log('✅ Send success message shows');
    
    // Modal should close after 2 seconds
    await page.waitForTimeout(2500);
    await expect(page.locator('#sendModal')).not.toHaveClass(/show/);
    
    console.log('✅ Send modal closes automatically');
  });

  test('should toggle currency and calculate equivalent', async ({ page }) => {
    await page.goto('/approve-spending.html');
    
    // Open send modal
    await page.locator('#eth-1 .use-btn').click();
    await page.locator('#eth-1 .send-btn').click();
    await page.waitForTimeout(200);
    
    // Enter USD amount
    await page.locator('#sendAmountInput').fill('50');
    await page.waitForTimeout(100);
    
    // Check equivalent shows token
    const equiv = await page.locator('#sendEquivalentAmount').textContent();
    console.log('USD → Token equivalent:', equiv);
    expect(equiv).toContain('ETH');
    
    // Switch to Token
    await page.locator('#sendTokenToggle').click();
    await page.waitForTimeout(100);
    
    // Check equivalent shows USD
    const usdEquiv = await page.locator('#sendEquivalentAmount').textContent();
    console.log('Token → USD equivalent:', usdEquiv);
    expect(usdEquiv).toContain('$');
    
    console.log('✅ Currency toggle works in Send modal');
  });
});





