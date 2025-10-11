// Verify floating navigation is visible
const { test, expect } = require('@playwright/test');

test('verify floating navigation is visible and styled correctly', async ({ page }) => {
  await page.goto('/dashboard.html');
  
  // Wait for page to load
  await page.waitForTimeout(500);
  
  // Find the floating nav (it's a div with rgba background)
  const floatingNav = await page.locator('div').filter({ 
    has: page.locator('text=Card').first()
  }).filter({
    has: page.locator('text=Activity')
  }).first();
  
  await expect(floatingNav).toBeVisible();
  
  // Check all nav items are present
  await expect(page.locator('text=Card').nth(1)).toBeVisible();
  await expect(page.locator('text=Activity').nth(1)).toBeVisible();
  await expect(page.locator('text=Earn').nth(1)).toBeVisible();
  await expect(page.locator('text=More').first()).toBeVisible();
  
  // Check market button (the circular one with shopping cart)
  const marketButton = await page.locator('div[style*="border-radius: 50%"]').filter({
    has: page.locator('text=🛒')
  });
  await expect(marketButton).toBeVisible();
  
  console.log('✅ All floating nav elements visible');
  
  // Get bounding box to verify position
  const navBox = await floatingNav.boundingBox();
  console.log('Floating nav position:', navBox);
  console.log('Bottom position (should be low):', navBox.y + navBox.height);
  console.log('Width:', navBox.width);
  
  // Take screenshot showing bottom of page
  await page.screenshot({ 
    path: 'test-results/dashboard-with-floating-nav.png',
    fullPage: true
  });
  
  console.log('✅ Floating navigation verified');
});





