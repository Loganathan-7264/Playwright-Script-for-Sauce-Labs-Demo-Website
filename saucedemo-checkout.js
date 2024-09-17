const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  // Define the path for the screenshots folder
  const screenshotsDir = path.join(__dirname, 'screenshots');

  // Create the folder if it doesn't exist
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
    console.log('Screenshots directory created.');
  } else {
    console.log('Screenshots directory already exists.');
  }

  // Launch a new browser instance
  const browser = await chromium.launch({ headless: false }); // Set headless: true if you don't need the UI

  // Open a new page
  const page = await browser.newPage();

  // Go to Sauce Labs demo website
  await page.goto('https://www.saucedemo.com');
  await page.screenshot({ path: path.join(screenshotsDir, 'homepage.png') });

  // Login to the website
  await page.fill('#user-name', 'standard_user'); // Username field
  await page.fill('#password', 'secret_sauce'); // Password field
  await page.click('#login-button'); // Login button

  // Wait for the inventory page to load
  await page.waitForSelector('.inventory_list');
  await page.screenshot({ path: path.join(screenshotsDir, 'inventory-page.png') });

  // Select a product (e.g., first product in the list)
  await page.click('.inventory_item:first-of-type .btn_inventory'); // Add the first product to the cart
  await page.screenshot({ path: path.join(screenshotsDir, 'product-added.png') });

  // Go to the cart
  await page.click('.shopping_cart_link'); // Click the cart icon
  await page.screenshot({ path: path.join(screenshotsDir, 'cart-page.png') });

  // Proceed to checkout
  await page.click('.checkout_button'); // Click the Checkout button
  await page.screenshot({ path: path.join(screenshotsDir, 'checkout-page.png') });

  // Log a message to confirm the script ran successfully
  console.log('Automation completed and screenshots saved in the screenshots folder.');

  // Close the browser
  await browser.close();
})();
