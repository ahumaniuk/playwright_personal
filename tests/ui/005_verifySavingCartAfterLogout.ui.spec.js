import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import { InventoryPage } from "../../pages/InventoryPage.js";
import { CartPage } from "../../pages/CartPage.js";
import { config } from "../../config/env.config.js";


test.describe("Verify saving cart after logout", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(config.users.standard.username, config.users.standard.password);
  });

  test('ID=005, Title="Verify that the cart is saved after logout"', async ({
    page,
  }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await inventoryPage.addToCartBackpackButton.click();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    await inventoryPage.openMenu();
    await inventoryPage.logOut();
    await expect(page).toHaveURL(`${config.baseURL}`);
    const loginPage = new LoginPage(page);
    await expect (loginPage.usernameInput).toBeEmpty();
    await expect (loginPage.passwordInput).toBeEmpty();
   
    await loginPage.open();
    await loginPage.login(config.users.standard.username, config.users.standard.password);
    await expect(page).toHaveURL(`${config.baseURL}inventory.html`);
    await expect(inventoryPage.inventoryList).toBeVisible();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
    await inventoryPage.openCart();
    await expect(page).toHaveURL(process.env.CART_PAGE_URL);
    await expect(cartPage.shoppingCart).toBeVisible();
    await expect(cartPage.shoppingCart).toHaveText("1");
    await expect(cartPage.cartItem).toHaveText(
      "Sauce Labs Backpack",
    );
  });
});
