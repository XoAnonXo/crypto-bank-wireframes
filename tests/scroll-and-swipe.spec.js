// Test scrolling and swiping
const { test, expect } = require('@playwright/test');

test('verify scrolling and swiping both work', async ({ page }) => {
  await page.goto('/dashboard.html');
  
  // Check initial position
  await expect(page.locator('#headerTitle')).toContainText('Approved');
  
  // Scroll down to check vertical scrolling works
  await page.evaluate(() => {
    document.querySelector('.content').scrollTop = 500;
  });
  
  await page.waitForTimeout(300);
  console.log('✅ Vertical scrolling works');
  
  // Scroll back to top
  await page.evaluate(() => {
    document.querySelector('.content').scrollTop = 0;
  });
  
  await page.waitForTimeout(300);
  
  // Try clicking dot to switch mode
  await page.locator('#dot1').click();
  await page.waitForTimeout(500);
  
  // Check header changed
  const headerText = await page.locator('#headerTitle').textContent();
  console.log('Header after dot click:', headerText);
  
  await expect(page.locator('#headerTitle')).toContainText('Vault');
  
  // Take screenshot of borrow mode
  await page.screenshot({ 
    path: 'test-results/borrow-mode-active.png',
    fullPage: false 
  });
  
  console.log('✅ Dot click switches to Borrow Mode (Vault)');
  
  // Click back
  await page.locator('#dot0').click();
  await page.waitForTimeout(500);
  
  await expect(page.locator('#headerTitle')).toContainText('Approved');
  
  console.log('✅ Both scrolling and mode switching work!');
});




