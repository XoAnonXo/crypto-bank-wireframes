// Test updated dashboard layout
const { test, expect } = require('@playwright/test');

test('verify updated dashboard layout', async ({ page }) => {
  await page.goto('/dashboard.html');
  
  // Check balance display
  await expect(page.locator('.balance')).toContainText('$45,892.34');
  
  // Check new yield text
  await expect(page.locator('text=420.69 MIM yielded in last 24h')).toBeVisible();
  
  // Check new quick action buttons
  await expect(page.locator('button:has-text("Approve Spending")')).toBeVisible();
  await expect(page.locator('button:has-text("Top up")')).toBeVisible();
  await expect(page.locator('button:has-text("Yield")')).toBeVisible();
  
  // Check assets are in row layout
  const assetsGrid = await page.locator('div[style*="grid-template-columns: repeat(3, 1fr)"]');
  await expect(assetsGrid).toBeVisible();
  
  // Check asset tickers
  await expect(page.locator('text=USD')).toBeVisible();
  await expect(page.locator('text=ETH')).toBeVisible();
  await expect(page.locator('text=BTC')).toBeVisible();
  
  // Check "View more" link
  await expect(page.locator('a:has-text("View more")')).toBeVisible();
  
  // Take screenshot
  await page.screenshot({ 
    path: 'test-results/dashboard-updated.png',
    fullPage: true 
  });
  
  console.log('✅ Dashboard updated successfully');
  console.log('✅ All new elements verified');
});





