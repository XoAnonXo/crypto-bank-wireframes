// Test spending mode toggle
const { test, expect } = require('@playwright/test');

test('should toggle between Direct Spending and Borrow Mode', async ({ page }) => {
  await page.goto('/dashboard.html');
  
  // Check initial state - Direct Spending Mode
  await expect(page.locator('#spendingModeLabel')).toContainText('Direct Spending Mode');
  
  // Take screenshot of Direct Spending state
  await page.screenshot({ 
    path: 'test-results/mode-direct-spending.png',
    fullPage: false 
  });
  
  console.log('✅ Initial state: Direct Spending Mode');
  
  // Click toggle
  await page.locator('#spendingModeToggle').check();
  await page.waitForTimeout(500);
  
  // Should now show Borrow Mode
  await expect(page.locator('#spendingModeLabel')).toContainText('Borrow Mode');
  
  // Take screenshot of Borrow Mode state
  await page.screenshot({ 
    path: 'test-results/mode-borrow.png',
    fullPage: false 
  });
  
  console.log('✅ Toggled to: Borrow Mode');
  
  // Toggle back
  await page.locator('#spendingModeToggle').uncheck();
  await page.waitForTimeout(500);
  
  // Should return to Direct Spending Mode
  await expect(page.locator('#spendingModeLabel')).toContainText('Direct Spending Mode');
  
  console.log('✅ Toggled back to: Direct Spending Mode');
  console.log('✅ Toggle works correctly');
});

test('should show info message when clicking info button', async ({ page }) => {
  await page.goto('/dashboard.html');
  
  // Setup dialog handler
  page.on('dialog', async dialog => {
    console.log('Dialog message:', dialog.message());
    expect(dialog.message()).toContain('Direct Spending Mode');
    await dialog.accept();
  });
  
  // Click info button
  const infoBtn = await page.locator('div:has-text("i")').filter({ hasText: /^i$/ }).first();
  await infoBtn.click();
  await page.waitForTimeout(200);
  
  console.log('✅ Info popup triggered');
});





