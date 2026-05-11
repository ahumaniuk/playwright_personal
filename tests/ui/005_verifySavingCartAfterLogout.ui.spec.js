import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { InventoryPage } from '../../pages/InventoryPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { users } from '../../test_data/users.js';
import { login } from "../utils/utils_cart.ui.js";

test.describe('Verify saving cart after logout', () => {
    test.beforeEach(async ({ page }) => {
        // "User is on the logined into account
        // User is on the inventory page"
        await login(page);
    })

    test('ID=005, Title="Verify that the cart is saved after logout"', async ({ page }) => {
            const inventoryPage = new InventoryPage(page);
            const cartPage = new CartPage(page);
            // Click on the "Add to cart" button near any product
            await inventoryPage.addToCartBackpackButton.click();
            // Expected result: The number near the cart at the top right increase by 1, product is added to cart
            await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
            // Click on the "Burger" button at the top left corner
            await inventoryPage.burgerMenuButton.click();
            //Click on the "Logout" button
            await inventoryPage.LogoutButton.click();
            //User are redirecred to the "Login" page, "Username" and "Password" field are empty
            await expect(page).toHaveURL(process.env.BASE_URL);
            await expect(page.locator('[data-test="username"]')).toBeEmpty();
            await expect(page.locator('[data-test="password"]')).toBeEmpty();
            //Login to the account using the same valid login and password
            await login(page);
            //User is redirected to the inventory page. Products and cart are displayed
            await expect(page).toHaveURL(process.env.INVENTORY_PAGE_URL);
            await expect(inventoryPage.inventoryList).toBeVisible();
            await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
            //Click on the "Cart" button at the top right corner
            await page.locator('[data-test="shopping-cart-link"]').click();
            //Cart page is displayed, 
            await expect(page).toHaveURL(process.env.CART_PAGE_URL);
            await expect(cartPage.shoppingCart).toBeVisible();
            await expect(cartPage.shoppingCart).toHaveText('1');
            //product are the same as was added at step 1
            await expect(page.locator('[data-test="item-4-title-link"]')).toHaveText('Sauce Labs Backpack');

    })
})