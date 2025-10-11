// Test approve spending page with expandable actions
const { test, expect } = require('@playwright/test');

test.describe('Approve Spending Page', () => {
  test('should display all wallet assets', async ({ page }) => {
    await page.goto('/approve-spending.html');
    
    // Check total balance
    await expect(page.locator('text=Wallet Balance')).toBeVisible();
    await expect(page.locator('text=$1,036')).toBeVisible();
    
    // Check all tokens are listed
    await expect(page.locator('text=ETH').first()).toBeVisible();
    await expect(page.locator('text=BNB')).toBeVisible();
    await expect(page.locator('text=USDC')).toBeVisible();
    await expect(page.locator('text=USDT0')).toBeVisible();
    
    // Take initial screenshot
    await page.screenshot({ 
      path: 'test-results/approve-spending-initial.png',
      fullPage: true 
    });
  });

  test('should expand actions when clicking Use button', async ({ page }) => {
    await page.goto('/approve-spending.html');
    
    // Find first ETH item
    const firstEth = await page.locator('#eth-1');
    const useBtn = await firstEth.locator('.use-btn');
    
    // Check actions are hidden initially
    const actions = await firstEth.locator('.action-buttons');
    await expect(actions).not.toHaveClass(/show/);
    
    // Click Use button
    await useBtn.click();
    await page.waitForTimeout(100);
    
    // Actions should now be visible
    await expect(actions).toHaveClass(/show/);
    
    // Check both action buttons are visible
    await expect(firstEth.locator('button:has-text("Approve Spending")')).toBeVisible();
    await expect(firstEth.locator('button:has-text("Send to Vault")')).toBeVisible();
    
    // Use button should now show ×
    await expect(useBtn).toContainText('×');
    
    // Take screenshot with expanded actions
    await page.screenshot({ 
      path: 'test-results/approve-spending-expanded.png',
      fullPage: true 
    });
    
    console.log('✅ Use button expands actions correctly');
  });

  test('should collapse other items when expanding new one', async ({ page }) => {
    await page.goto('/approve-spending.html');
    
    // Expand first ETH
    await page.locator('#eth-1 .use-btn').click();
    await page.waitForTimeout(100);
    
    // Verify it's expanded
    await expect(page.locator('#actions-eth-1')).toHaveClass(/show/);
    
    // Expand BNB
    await page.locator('#bnb .use-btn').click();
    await page.waitForTimeout(100);
    
    // BNB should be expanded
    await expect(page.locator('#actions-bnb')).toHaveClass(/show/);
    
    // ETH should be collapsed
    await expect(page.locator('#actions-eth-1')).not.toHaveClass(/show/);
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/approve-spending-toggle.png',
      fullPage: true 
    });
    
    console.log('✅ Only one item expanded at a time');
  });
});





