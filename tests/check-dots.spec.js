// Quick test to verify dots positioning on the right
const { test, expect } = require('@playwright/test');

test('verify dots are on the right side', async ({ page }) => {
  await page.goto('/splash.html');
  
  // Get viewport and dots position
  const viewport = page.viewportSize();
  const dots = await page.locator('.dots');
  const dotsBox = await dots.boundingBox();
  
  console.log('Dots Positioning:');
  console.log('  Viewport width:', viewport.width);
  console.log('  Dots X position:', dotsBox.x);
  console.log('  Dots right edge:', dotsBox.x + dotsBox.width);
  console.log('  Distance from right:', viewport.width - (dotsBox.x + dotsBox.width));
  console.log('  Dots are on right side:', dotsBox.x > viewport.width / 2);
  
  // Verify dots are vertically stacked
  const firstDot = await page.locator('#dot0').boundingBox();
  const secondDot = await page.locator('#dot1').boundingBox();
  
  console.log('  First dot Y:', firstDot.y);
  console.log('  Second dot Y:', secondDot.y);
  console.log('  Vertical stack confirmed:', secondDot.y > firstDot.y);
  
  // Take screenshot showing dots on right
  await page.screenshot({ 
    path: 'test-results/splash-dots-right-side.png',
    fullPage: false 
  });
  
  // Click through all slides to see dot animation
  await page.locator('#nextBtn').click();
  await page.waitForTimeout(600);
  
  await page.screenshot({ 
    path: 'test-results/splash-slide-2-with-dots.png',
    fullPage: false 
  });
  
  await page.locator('#nextBtn').click();
  await page.waitForTimeout(600);
  
  await page.screenshot({ 
    path: 'test-results/splash-slide-3-with-dots.png',
    fullPage: false 
  });
});





