import { test, expect } from "@playwright/test";
import { LoginPage } from '../../pages/loginPage.js';
import { InventoryPage } from '../../pages/InventoryPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { CheckOutPage } from '../../pages/CheckOutPage.js';
import { CheckOut2Page } from '../../pages/CheckOut2Page.js';
import { CheckOutCompletePage } from '../../pages/CheckOutCompletePage.js';
import { users } from '../../test_data/users.js';
import { login } from "../utils/utils_cart.ui.js";

test.describe('Verify Valid Checkout', () => {
    test.beforeEach(async ({ page }) => {
        // "User is on the logined into account
        // User is on the inventory page"
        await login(page);
    })

    test('ID=008, Title="Verify Valid Checkout"', { tag: '@smoke' }, async ({ page, context }) => {
            const inventoryPage = new InventoryPage(page);
            const cartPage = new CartPage(page);
            const checkOutPage = new CheckOutPage(page);
            const checkOut2Page = new CheckOut2Page(page);
            const checkOutCompletePage = new CheckOutCompletePage(page);
            // Click on the "Add to cart" button near any product
            await inventoryPage.addToCartBackpackButton.click();
            // Expected result: The number near the cart at the top right increase by 1, product is added to cart
            await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
            await inventoryPage.shoppingCartBadge.click();
            // Expected result: Cart page is displayed, product are the same as was added at step 1
            await expect(inventoryPage.shoppingCartBadge).toHaveText('1');


            await expect(cartPage.cartItem).toHaveText('Sauce Labs Backpack');
            // Click on the "Checkout" button
            await cartPage.checkoutButton.click();
            // Checkout form are displayed
            await expect(page).toHaveURL(process.env.CHECKOUT_STEP_ONE_PAGE_URL);
            // Fill the "First Name" field with valid data

            await checkOutPage.firstNameInput.fill('Anastasiia');
            // Fill the "Last Name" field with valid data
            await checkOutPage.lastNameInput.fill('Koval');
            // Fill the "Postal Code" field with valid data
            await checkOutPage.postalCodeInput.fill('12345');
            // Click on the "Continue" button
            await checkOutPage.continueButton.click();
            // Expected result: User is navigated to the checkout step two page, information about product and total price are displayed
            await expect(page).toHaveURL(process.env.CHECKOUT_STEP_TWO_PAGE_URL);

            
            await expect(checkOut2Page.inventoryItemName).toHaveText('Sauce Labs Backpack');
            await expect(checkOut2Page.summaryTotalLabel).toHaveText('Total: $32.39');
            // Click on the "Finish" button
            await expect(checkOut2Page.finishButton).toBeVisible();
            await checkOut2Page.finishButton.click();
            //User is redirected to the "Checkout Complete" page, "Thank you for your order!" message are displayed
            await expect(page).toHaveURL(process.env.CHECKOUT_COMPLETE_PAGE_URL);

            await expect(checkOutCompletePage.completeHeader).toHaveText('Thank you for your order!');
            //Click on the "Back Home" button
            await checkOutCompletePage.backHomeButton.click();
            // Expected result: User is redirected to the inventory page. Products are displayed. Cart is empty
            await expect(page).toHaveURL(process.env.INVENTORY_PAGE_URL);
            await expect(inventoryPage.shoppingCartBadge).toBeHidden();   
    })
})