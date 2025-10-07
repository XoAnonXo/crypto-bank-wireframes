// Playwright test for Splash Screen alignment and functionality
const { test, expect } = require('@playwright/test');

test.describe('Splash Screen Tests', () => {
  test('should display all 3 slides with proper alignment', async ({ page }) => {
    await page.goto('/splash.html');
    
    // Take screenshot of first slide
    await page.screenshot({ 
      path: 'test-results/splash-slide-1.png',
      fullPage: false 
    });
    
    // Check first slide content
    await expect(page.locator('h1')).toContainText('Magic Internet Money');
    
    // Check icon is visible
    const icon = await page.locator('.slide-icon').first();
    await expect(icon).toBeVisible();
    
    // Check dots are present
    const dots = await page.locator('.dot');
    await expect(dots).toHaveCount(3);
    
    // Check first dot is active
    const activeDot = await page.locator('.dot.active');
    await expect(activeDot).toHaveCount(1);
    
    // Verify Next button
    const nextBtn = await page.locator('#nextBtn');
    await expect(nextBtn).toContainText('Next');
    await expect(nextBtn).toBeVisible();
    
    // Get bounding boxes for alignment check
    const slideBox = await page.locator('.slide').first().boundingBox();
    const iconBox = await icon.boundingBox();
    const titleBox = await page.locator('h1').first().boundingBox();
    
    console.log('Slide 1 Alignment:');
    console.log('  Icon position:', iconBox);
    console.log('  Title position:', titleBox);
    console.log('  Icon centered:', Math.abs(iconBox.x + iconBox.width/2 - slideBox.width/2) < 10);
    
    // Click Next to go to slide 2
    await nextBtn.click();
    await page.waitForTimeout(600);
    
    // Take screenshot of second slide
    await page.screenshot({ 
      path: 'test-results/splash-slide-2.png',
      fullPage: false 
    });
    
    // Check second slide content
    await expect(page.locator('h1').nth(1)).toContainText('non-custodial bank that pays you');
    
    // Check second dot is active
    await expect(page.locator('#dot1')).toHaveClass(/active/);
    
    // Click Next to go to slide 3
    await nextBtn.click();
    await page.waitForTimeout(600);
    
    // Take screenshot of third slide
    await page.screenshot({ 
      path: 'test-results/splash-slide-3.png',
      fullPage: false 
    });
    
    // Check third slide content
    await expect(page.locator('h1').nth(2)).toContainText('total control of your MIM');
    
    // Check third dot is active
    await expect(page.locator('#dot2')).toHaveClass(/active/);
    
    // Button should now say "Get Started"
    await expect(nextBtn).toContainText('Get Started');
    
    // Click Get Started
    await nextBtn.click();
    
    // Should navigate to registration
    await expect(page).toHaveURL(/register\.html/);
  });

  test('should have properly centered elements', async ({ page }) => {
    await page.goto('/splash.html');
    
    const viewport = page.viewportSize();
    const centerX = viewport.width / 2;
    
    // Check icon is centered
    const icon = await page.locator('.slide-icon').first();
    const iconBox = await icon.boundingBox();
    const iconCenterX = iconBox.x + iconBox.width / 2;
    
    console.log('Alignment Check:');
    console.log('  Viewport width:', viewport.width);
    console.log('  Center X:', centerX);
    console.log('  Icon center X:', iconCenterX);
    console.log('  Icon is centered:', Math.abs(iconCenterX - centerX) < 20);
    
    // Check title is centered
    const title = await page.locator('h1').first();
    const titleBox = await title.boundingBox();
    const titleCenterX = titleBox.x + titleBox.width / 2;
    
    console.log('  Title center X:', titleCenterX);
    console.log('  Title is centered:', Math.abs(titleCenterX - centerX) < 20);
    
    // Check next button is centered
    const nextBtn = await page.locator('#nextBtn');
    const btnBox = await nextBtn.boundingBox();
    const btnCenterX = btnBox.x + btnBox.width / 2;
    
    console.log('  Button center X:', btnCenterX);
    console.log('  Button is centered:', Math.abs(btnCenterX - centerX) < 20);
    
    // Take annotated screenshot
    await page.screenshot({ 
      path: 'test-results/splash-alignment-check.png',
      fullPage: false 
    });
  });

  test('should animate between slides smoothly', async ({ page }) => {
    await page.goto('/splash.html');
    
    const slides = await page.locator('#slides');
    
    // Initial position
    const initialTransform = await slides.evaluate(el => 
      window.getComputedStyle(el).transform
    );
    console.log('Initial transform:', initialTransform);
    
    // Click next
    await page.locator('#nextBtn').click();
    await page.waitForTimeout(600);
    
    // New position
    const newTransform = await slides.evaluate(el => 
      window.getComputedStyle(el).transform
    );
    console.log('After click transform:', newTransform);
    
    // Take screenshot during transition
    await page.screenshot({ 
      path: 'test-results/splash-slide-transition.png',
      fullPage: false 
    });
  });
});




