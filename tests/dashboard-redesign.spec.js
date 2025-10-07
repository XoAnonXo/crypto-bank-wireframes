// Test redesigned dashboard
const { test, expect } = require('@playwright/test');

test('verify redesigned dashboard elements', async ({ page }) => {
  await page.goto('/dashboard.html');
  
  // Check updated button names
  await expect(page.locator('button:has-text("Manage Funds")')).toBeVisible();
  await expect(page.locator('button:has-text("Pay")')).toBeVisible();
  await expect(page.locator('button:has-text("Yield")')).toBeVisible();
  
  console.log('✅ Button names updated');
  
  // Check yield text
  await expect(page.locator('text=420.69 MIM yielded')).toBeVisible();
  
  // Check card is displayed
  await expect(page.locator('text=Your Card')).toBeVisible();
  await expect(page.locator('text=•••• •••• •••• 4892')).toBeVisible();
  
  console.log('✅ Card displayed');
  
  // Check swipe indicator
  const swipeIndicators = await page.locator('div[style*="border-radius: 2px"]').count();
  console.log('Swipe indicator found:', swipeIndicators > 0);
  
  // Check assets section
  await expect(page.locator('text=Assets').first()).toBeVisible();
  
  // Check transactions section
  await expect(page.locator('text=Recent Transactions')).toBeVisible();
  await expect(page.locator('text=Deposit')).toBeVisible();
  await expect(page.locator('text=Starbucks')).toBeVisible();
  
  console.log('✅ Transactions section present');
  
  // Check support section
  await expect(page.locator('text=Help & Support')).toBeVisible();
  await expect(page.locator('text=Support').nth(1)).toBeVisible();
  await expect(page.locator('text=FAQ')).toBeVisible();
  await expect(page.locator('button:has-text("Ask AI")')).toBeVisible();
  
  console.log('✅ Support section present');
  
  // Check floating nav bar
  const floatingNav = await page.locator('div[style*="rgba(26, 26, 26, 0.95)"]');
  await expect(floatingNav).toBeVisible();
  
  // Check nav has rounded corners and is positioned
  const navStyle = await floatingNav.getAttribute('style');
  console.log('Floating nav has border-radius:', navStyle.includes('border-radius: 24px'));
  console.log('Floating nav is fixed:', navStyle.includes('position: fixed'));
  console.log('Floating nav is at bottom:', navStyle.includes('bottom: 20px'));
  
  console.log('✅ Floating navigation bar present');
  
  // Take full page screenshot
  await page.screenshot({ 
    path: 'test-results/dashboard-redesigned-full.png',
    fullPage: true 
  });
  
  console.log('✅ Dashboard redesign complete');
});




