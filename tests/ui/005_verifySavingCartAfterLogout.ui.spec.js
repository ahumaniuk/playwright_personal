import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import { InventoryPage } from "../../pages/InventoryPage.js";
import { CartPage } from "../../pages/CartPage.js";
import { users } from "../../env/test_data/users.js";
import { login } from "../utils/utils_cart.ui.js";

test.describe("Verify saving cart after logout", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
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
    await expect(page).toHaveURL(process.env.BASE_URL);
    const loginPage = new LoginPage(page);
    await expect (loginPage.usernameInput).toBeEmpty();
    await expect (loginPage.passwordInput).toBeEmpty();
   
    await login(page);
    await expect(page).toHaveURL(process.env.INVENTORY_PAGE_URL);
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
