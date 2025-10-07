// Test approval modal functionality
const { test, expect } = require('@playwright/test');

test.describe('Approval Modal', () => {
  test('should open modal when clicking Approve Spending', async ({ page }) => {
    await page.goto('/approve-spending.html');
    
    // Expand first ETH item
    await page.locator('#eth-1 .use-btn').click();
    await page.waitForTimeout(200);
    
    // Click Approve Spending
    await page.locator('#eth-1 .approve-btn').click();
    await page.waitForTimeout(200);
    
    // Modal should be visible
    const modal = await page.locator('#approvalModal');
    await expect(modal).toHaveClass(/show/);
    
    // Check modal content
    await expect(page.locator('#modalTitle')).toContainText('Approve Spending');
    await expect(page.locator('#tokenName')).toContainText('ETH');
    await expect(page.locator('.modal-text')).toContainText('Your balance will not change');
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/approval-modal-open.png',
      fullPage: false 
    });
    
    console.log('✅ Modal opens correctly');
  });

  test('should toggle between USD and Token amount', async ({ page }) => {
    await page.goto('/approve-spending.html');
    
    // Open modal
    await page.locator('#eth-1 .use-btn').click();
    await page.locator('#eth-1 .approve-btn').click();
    await page.waitForTimeout(200);
    
    // Check USD is active
    await expect(page.locator('#usdToggle')).toHaveClass(/active/);
    
    // Enter USD amount
    await page.locator('#amountInput').fill('100');
    await page.waitForTimeout(100);
    
    // Check equivalent shows token amount
    const equiv = await page.locator('#equivalentAmount').textContent();
    console.log('Equivalent amount:', equiv);
    expect(equiv).toContain('ETH');
    
    // Switch to Token
    await page.locator('#tokenToggle').click();
    await page.waitForTimeout(100);
    
    // Check Token is now active
    await expect(page.locator('#tokenToggle')).toHaveClass(/active/);
    
    // Equivalent should now show USD
    const usdEquiv = await page.locator('#equivalentAmount').textContent();
    console.log('USD equivalent:', usdEquiv);
    expect(usdEquiv).toContain('$');
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/approval-modal-toggle.png',
      fullPage: false 
    });
    
    console.log('✅ Currency toggle works');
  });

  test('should set MAX amount when clicking MAX button', async ({ page }) => {
    await page.goto('/approve-spending.html');
    
    // Open modal
    await page.locator('#eth-1 .use-btn').click();
    await page.locator('#eth-1 .approve-btn').click();
    await page.waitForTimeout(200);
    
    // Click MAX button
    await page.locator('.max-btn').click();
    await page.waitForTimeout(100);
    
    // Input should have max value
    const inputValue = await page.locator('#amountInput').inputValue();
    console.log('Max amount set:', inputValue);
    expect(parseFloat(inputValue)).toBeGreaterThan(0);
    
    console.log('✅ MAX button works');
  });

  test('should show success message when approving', async ({ page }) => {
    await page.goto('/approve-spending.html');
    
    // Open modal
    await page.locator('#eth-1 .use-btn').click();
    await page.locator('#eth-1 .approve-btn').click();
    await page.waitForTimeout(200);
    
    // Enter amount
    await page.locator('#amountInput').fill('50');
    
    // Click Approve
    await page.locator('#approveBtn').click();
    await page.waitForTimeout(100);
    
    // Button text should change
    await expect(page.locator('#approveBtn')).toContainText('Approve transaction requested');
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/approval-modal-success.png',
      fullPage: false 
    });
    
    console.log('✅ Approval success message shows');
    
    // Modal should close after 2 seconds
    await page.waitForTimeout(2500);
    await expect(page.locator('#approvalModal')).not.toHaveClass(/show/);
    
    console.log('✅ Modal closes automatically');
  });

  test('should close modal when clicking Cancel', async ({ page }) => {
    await page.goto('/approve-spending.html');
    
    // Open modal
    await page.locator('#eth-1 .use-btn').click();
    await page.locator('#eth-1 .approve-btn').click();
    await page.waitForTimeout(200);
    
    // Click Cancel
    await page.locator('button:has-text("Cancel")').click();
    await page.waitForTimeout(100);
    
    // Modal should be hidden
    await expect(page.locator('#approvalModal')).not.toHaveClass(/show/);
    
    console.log('✅ Cancel button closes modal');
  });
});




