// Test swipeable dashboard modes
const { test, expect } = require('@playwright/test');

test('should have two swipeable modes with header changes', async ({ page }) => {
  await page.goto('/dashboard.html');
  
  // Check initial state - Direct Spending Mode (Approved)
  await expect(page.locator('#headerTitle')).toContainText('Approved');
  await expect(page.locator('text=Total Balance')).toBeVisible();
  
  // Take screenshot of Direct Spending Mode
  await page.screenshot({ 
    path: 'test-results/mode-approved.png',
    fullPage: true 
  });
  
  console.log('✅ Screen 1: Approved (Direct Spending)');
  
  // Click second dot to switch to Borrow Mode
  await page.locator('#dot1').click();
  await page.waitForTimeout(400);
  
  // Header should change to "Vault"
  await expect(page.locator('#headerTitle')).toContainText('Vault');
  
  // Should see Borrow Mode content
  await expect(page.locator('text=Vault Balance')).toBeVisible();
  await expect(page.locator('text=Borrow Mode Active')).toBeVisible();
  
  // Take screenshot of Borrow Mode
  await page.screenshot({ 
    path: 'test-results/mode-vault-borrow.png',
    fullPage: true 
  });
  
  console.log('✅ Screen 2: Vault (Borrow Mode)');
  
  // Click first dot to return
  await page.locator('#dot0').click();
  await page.waitForTimeout(400);
  
  // Should return to Approved
  await expect(page.locator('#headerTitle')).toContainText('Approved');
  
  console.log('✅ Swipe navigation works');
  console.log('✅ Header changes: Approved ↔ Vault');
});




