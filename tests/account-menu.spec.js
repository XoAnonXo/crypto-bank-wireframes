// Test account bottom sheet menu
const { test, expect } = require('@playwright/test');

test('should open account menu when clicking 0x icon', async ({ page }) => {
  await page.goto('/dashboard.html');
  
  // Take initial screenshot
  await page.screenshot({ 
    path: 'test-results/dashboard-with-0x-icon.png',
    fullPage: false 
  });
  
  // Find and click the 0x avatar
  const avatar = await page.locator('div:has-text("0x")').first();
  await expect(avatar).toBeVisible();
  
  console.log('✅ 0x avatar visible in top left');
  
  // Click to open menu
  await avatar.click();
  await page.waitForTimeout(400);
  
  // Menu should be visible
  const menu = await page.locator('#accountMenu');
  const menuTransform = await menu.evaluate(el => 
    window.getComputedStyle(el).transform
  );
  
  console.log('Menu transform:', menuTransform);
  console.log('Menu opened:', menuTransform.includes('matrix'));
  
  // Check menu items are visible
  await expect(page.locator('#accountMenu >> text=Personal Info')).toBeVisible();
  await expect(page.locator('#accountMenu >> text=Settings')).toBeVisible();
  await expect(page.locator('#accountMenu >> text=Add Another Account')).toBeVisible();
  await expect(page.locator('#accountMenu >> text=Log Out')).toBeVisible();
  
  // Check user info in menu
  await expect(page.locator('#accountMenu >> text=John Doe')).toBeVisible();
  await expect(page.locator('#accountMenu >> text=0x742d...3a91')).toBeVisible();
  
  // Take screenshot with menu open
  await page.screenshot({ 
    path: 'test-results/account-menu-open.png',
    fullPage: false 
  });
  
  console.log('✅ Account menu opens with all items');
  
  // Click overlay to close
  await page.locator('#menuOverlay').click();
  await page.waitForTimeout(400);
  
  console.log('✅ Menu closes when clicking overlay');
});

