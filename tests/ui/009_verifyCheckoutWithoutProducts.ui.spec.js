import { test, expect } from "@playwright/test";
import { LoginPage } from '../../pages/loginPage.js';
import { InventoryPage } from '../../pages/InventoryPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { CheckOutPage } from '../../pages/CheckOutPage.js';
import { users } from '../../test_data/users.js';
import { login } from "../utils/utils_cart.ui.js";

test.describe('Tests with negative scenarios on checkout', () => {
    test.beforeEach(async ({ page }) => {
        // "User is on the logined into account
        // User is on the inventory page"
        await login(page);
    })

    test('ID=009, Title="Verify Checkout without products"', { tag: ['@negative', '@medium']}, async ({ page, context }) => {
            const inventoryPage = new InventoryPage(page);
            const cartPage = new CartPage(page);
            const checkOutPage = new CheckOutPage(page);
           
            // Verify cart icon is displayed and has no products
            await expect(inventoryPage.shoppingCartBadge).toBeHidden();
            
            
            // Click on the "Cart" button at the top right corner
            await inventoryPage.cartIcon.click();
            // Expected result: Cart page is displayed, products are not displayed
            await expect(cartPage.cartItem).toBeHidden();
            await expect(cartPage.cartList).toBeEmpty();

            // Click on the "Checkout" button
            await cartPage.checkoutButton.click();
            // Expected result: User are located on the "Cart" Page, 
            // error message "Cart is empty" is displayed
            await expect(page).toHaveURL(process.env.CART_PAGE_URL);
            await expect(page.locator('[data-test="error"]')).toHaveText('Your cart is empty');


            
    })
})