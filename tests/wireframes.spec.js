// Playwright tests for Crypto Bank Wireframes
const { test, expect } = require('@playwright/test');

// Test all pages load correctly
test.describe('Page Loading Tests', () => {
  const pages = [
    { name: 'Navigation Hub', url: '/', title: 'Crypto Bank Wireframes' },
    { name: 'Registration', url: '/register.html', title: 'Register' },
    { name: 'Dashboard', url: '/dashboard.html', title: 'Dashboard' },
    { name: 'Menu', url: '/menu.html', title: 'Menu' },
    { name: 'Connect Wallet', url: '/connect-wallet.html', title: 'Connect Wallet' },
    { name: 'Membership', url: '/membership.html', title: 'Membership' },
    { name: 'Add Funds', url: '/add-funds.html', title: 'Add Funds' },
    { name: 'Withdraw', url: '/withdraw.html', title: 'Withdraw' },
    { name: 'Earn', url: '/earn.html', title: 'Earn' },
    { name: 'Cards', url: '/cards.html', title: 'Card' },
    { name: 'Spending Limits', url: '/spending-limits.html', title: 'Spending Limits' },
    { name: 'Transactions', url: '/transactions.html', title: 'Transactions' },
    { name: 'Promotions', url: '/promotions.html', title: 'Promotions' },
    { name: 'Settings', url: '/settings.html', title: 'Settings' },
  ];

  for (const page of pages) {
    test(`${page.name} page should load`, async ({ page: pw }) => {
      await pw.goto(page.url);
      await expect(pw).toHaveTitle(new RegExp(page.title, 'i'));
      
      // Check if phone container exists
      const phoneContainer = await pw.locator('.phone-container, .nav-hub').first();
      await expect(phoneContainer).toBeVisible();
    });
  }
});

// Test registration flow
test.describe('Registration Flow', () => {
  test('should navigate through registration with Passkey', async ({ page }) => {
    await page.goto('/register.html');
    
    // Check page loaded
    await expect(page.locator('h1')).toContainText('Welcome to Crypto Bank');
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/registration-page.png', fullPage: true });
    
    // Click Passkey button
    await page.locator('button:has-text("Continue with Passkey")').click();
    
    // Should navigate to dashboard
    await expect(page).toHaveURL(/dashboard\.html/);
    await expect(page.locator('h1')).toContainText('Vault');
  });

  test('should navigate through registration with Google', async ({ page }) => {
    await page.goto('/register.html');
    
    // Click Google button
    await page.locator('button:has-text("Continue with Google")').click();
    
    // Should navigate to dashboard
    await expect(page).toHaveURL(/dashboard\.html/);
  });

  test('should navigate through Web3 wallet flow', async ({ page }) => {
    await page.goto('/register.html');
    
    // Click Web3 Wallet button
    await page.locator('button:has-text("Connect Web3 Wallet")').click();
    
    // Should navigate to wallet selection
    await expect(page).toHaveURL(/connect-wallet-register\.html/);
    await expect(page.locator('h1')).toContainText('Connect Wallet');
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/wallet-selection.png', fullPage: true });
    
    // Click MetaMask connect
    await page.locator('button:has-text("Connect")').first().click();
    
    // Should navigate to dashboard
    await expect(page).toHaveURL(/dashboard\.html/);
  });

  test('should allow skipping name input', async ({ page }) => {
    await page.goto('/register.html');
    
    // Click skip button
    await page.locator('button:has-text("Skip for now")').click();
    
    // Should navigate to dashboard
    await expect(page).toHaveURL(/dashboard\.html/);
  });
});

// Test dashboard functionality
test.describe('Dashboard Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard.html');
  });

  test('should display total balance', async ({ page }) => {
    const balance = await page.locator('.balance').first();
    await expect(balance).toBeVisible();
    await expect(balance).toContainText('$');
  });

  test('should show asset list', async ({ page }) => {
    const assets = await page.locator('.asset-item');
    await expect(assets).toHaveCount(3); // liquidUSD, ETH, BTC
  });

  test('should have working quick action buttons', async ({ page }) => {
    // Test Add Funds button
    await page.locator('button:has-text("Add Funds")').click();
    await expect(page).toHaveURL(/add-funds\.html/);
  });

  test('should take screenshot of dashboard', async ({ page }) => {
    await page.screenshot({ path: 'test-results/dashboard.png', fullPage: true });
  });
});

// Test bottom navigation
test.describe('Bottom Navigation Tests', () => {
  const navTests = [
    { icon: '🏠', text: 'Home', url: 'dashboard.html' },
    { icon: '📊', text: 'Activity', url: 'transactions.html' },
    { icon: '💰', text: 'Earn', url: 'earn.html' },
    { icon: '💳', text: 'Card', url: 'cards.html' },
    { icon: '⚙️', text: 'More', url: 'menu.html' },
  ];

  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard.html');
  });

  for (const nav of navTests) {
    test(`should navigate to ${nav.text}`, async ({ page }) => {
      // Find and click the nav item
      await page.locator('.nav-item', { hasText: nav.text }).click();
      
      // Verify navigation
      await expect(page).toHaveURL(new RegExp(nav.url));
    });
  }
});

// Test card management flow
test.describe('Card Management Tests', () => {
  test('should navigate from cards to spending limits', async ({ page }) => {
    await page.goto('/cards.html');
    
    // Check card is visible
    const cardTitle = await page.locator('h1');
    await expect(cardTitle).toContainText('Card');
    
    // Click spending limits
    await page.locator('.list-item:has-text("Spending Limits")').click();
    
    // Verify navigation
    await expect(page).toHaveURL(/spending-limits\.html/);
    await expect(page.locator('h1')).toContainText('Spending Limits');
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/spending-limits.png', fullPage: true });
  });

  test('should show card details', async ({ page }) => {
    await page.goto('/cards.html');
    
    // Check for card number
    await expect(page.locator('text=/•••• •••• •••• \\d{4}/')).toBeVisible();
  });
});

// Test wallet connection
test.describe('Wallet Connection Tests', () => {
  test('should list available wallets', async ({ page }) => {
    await page.goto('/connect-wallet.html');
    
    // Check for MetaMask
    await expect(page.locator('text=MetaMask')).toBeVisible();
    
    // Check for Trust Wallet
    await expect(page.locator('text=Trust Wallet')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/connect-wallet.png', fullPage: true });
  });
});

// Test earn/staking section
test.describe('Earn Section Tests', () => {
  test('should display earning opportunities', async ({ page }) => {
    await page.goto('/earn.html');
    
    // Check total earnings
    await expect(page.locator('text=Total Earnings')).toBeVisible();
    
    // Check for APY percentages
    await expect(page.locator('text=/\\d+\\.\\d+%/')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/earn.png', fullPage: true });
  });
});

// Test transactions page
test.describe('Transactions Tests', () => {
  test('should display transaction history', async ({ page }) => {
    await page.goto('/transactions.html');
    
    // Check filter tabs
    await expect(page.locator('.tab:has-text("All")')).toBeVisible();
    await expect(page.locator('.tab:has-text("Vault")')).toBeVisible();
    await expect(page.locator('.tab:has-text("Card")')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/transactions.png', fullPage: true });
  });
});

// Test menu and settings
test.describe('Menu and Settings Tests', () => {
  test('should navigate from menu to settings', async ({ page }) => {
    await page.goto('/menu.html');
    
    // Click Account Settings
    await page.locator('.list-item:has-text("Account Settings")').click();
    
    // Verify navigation
    await expect(page).toHaveURL(/settings\.html/);
    await expect(page.locator('h1')).toContainText('Settings');
  });

  test('should display user profile in settings', async ({ page }) => {
    await page.goto('/settings.html');
    
    // Check for user name
    await expect(page.locator('text=John Doe')).toBeVisible();
    
    // Check for email
    await expect(page.locator('text=john.doe@email.com')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/settings.png', fullPage: true });
  });
});

// Visual regression test - take screenshots of all pages
test.describe('Visual Screenshots', () => {
  const pages = [
    'register.html',
    'dashboard.html',
    'menu.html',
    'connect-wallet.html',
    'membership.html',
    'add-funds.html',
    'withdraw.html',
    'earn.html',
    'cards.html',
    'spending-limits.html',
    'transactions.html',
    'promotions.html',
    'settings.html',
  ];

  for (const pageName of pages) {
    test(`Screenshot: ${pageName}`, async ({ page }) => {
      await page.goto(`/${pageName}`);
      await page.screenshot({ 
        path: `test-results/screenshots/${pageName.replace('.html', '')}.png`,
        fullPage: true 
      });
    });
  }
});




