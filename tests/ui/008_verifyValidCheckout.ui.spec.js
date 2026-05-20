import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import { InventoryPage } from "../../pages/InventoryPage.js";
import { CartPage } from "../../pages/CartPage.js";
import { CheckOutPage } from "../../pages/CheckOutPage.js";
import { CheckOut2Page } from "../../pages/CheckOut2Page.js";
import { CheckOutCompletePage } from "../../pages/CheckOutCompletePage.js";
import { checkoutUser  } from "../../test_data/users.js";
import { config } from "../../config/env.config.js";

test.describe("Verify Valid Checkout", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(config.users.standard.username, config.users.standard.password);
  });

  test(
    'ID=008, Title="Verify Valid Checkout"',
    { tag: "@smoke" },
    async ({ page, context }) => {
      const inventoryPage = new InventoryPage(page);
      const cartPage = new CartPage(page);
      const checkOutPage = new CheckOutPage(page);
      const checkOut2Page = new CheckOut2Page(page);
      const checkOutCompletePage = new CheckOutCompletePage(page);

      await inventoryPage.addProductToCart();
      await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
      await inventoryPage.openCart();
      await expect(inventoryPage.shoppingCartBadge).toHaveText("1");

      await expect(cartPage.cartItem).toHaveText("Sauce Labs Backpack");
      await cartPage.checkoutButton.click();
      await expect(page).toHaveURL(`${config.baseURL}checkout-step-one.html`);
      await checkOutPage.fillCheckoutInformation(checkoutUser);
      await checkOutPage.continueButton.click();
      await expect(page).toHaveURL(`${config.baseURL}checkout-step-two.html`);

      await expect(checkOut2Page.inventoryItemName).toHaveText(
        "Sauce Labs Backpack",
      );
      await expect(checkOut2Page.summaryTotalLabel).toHaveText("Total: $32.39");
      await expect(checkOut2Page.finishButton).toBeVisible();
      await checkOut2Page.finishButton.click();
      await expect(page).toHaveURL(`${config.baseURL}checkout-complete.html`);

      await expect(checkOutCompletePage.completeHeader).toHaveText(
        "Thank you for your order!",
      );
      await checkOutCompletePage.returnToHomePage();
      await expect(page).toHaveURL(`${config.baseURL}inventory.html`);
      await expect(inventoryPage.shoppingCartBadge).toBeHidden();
    },
  );
});
