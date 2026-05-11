import {test, expect} from "playwright/test"
import { login, addBackpackToCart } from "../utils/utils_cart.ui.js";

test.beforeEach(async ({ page }) => {
  // Go to the starting url before each test and perform login
  await login(page);
});

test.describe('Add product to cart', () => {
    test('ID=0010, Title="Verify adding product to cart"', {tag: '@smoke'}, async ({page}) => {
        // select product and add to cart
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        // verify the cart icon shows the correct number of items
        await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText('1');
        // navigate to cart and verify the correct product is added
        await page.locator('[data-test="shopping-cart-link"]').click();
        // verify the correct product is in the cart
        const cartItem = page.locator('.cart_item');
        await expect(cartItem.filter({ hasText: 'Sauce Labs Backpack' })).toBeVisible();
    
    })
    
    test('ID=0011, Title="Verify removing product from cart"', {tag: '@smoke'}, async ({page}) => {
        await addBackpackToCart(page);
        await page.locator('[data-test="shopping-cart-link"]').click();
        const cartItem = page.locator('.cart_item');
        await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
        await expect(cartItem.filter({ hasText: 'Sauce Labs Backpack' })).not.toBeVisible();
    })

})