import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import { InventoryPage } from "../../pages/InventoryPage.js";
import { CartPage } from "../../pages/CartPage.js";
import { CheckOutPage } from "../../pages/CheckOutPage.js";
import { CheckOut2Page } from "../../pages/CheckOut2Page.js";
import { CheckOutCompletePage } from "../../pages/CheckOutCompletePage.js";
import { users } from "../../env/test_data/users.js";
import { login } from "../utils/utils_cart.ui.js";

test.describe("Verify Valid Checkout", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
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
      await inventoryPage.addToCartBackpackButton.click();
      await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
      await inventoryPage.shoppingCartBadge.click();
      await expect(inventoryPage.shoppingCartBadge).toHaveText("1");

      await expect(cartPage.cartItem).toHaveText("Sauce Labs Backpack");
      await cartPage.checkoutButton.click();
      await expect(page).toHaveURL(process.env.CHECKOUT_STEP_ONE_PAGE_URL);
      await checkOutPage.firstNameInput.fill("Anastasiia");
      await checkOutPage.lastNameInput.fill("Koval");
      await checkOutPage.postalCodeInput.fill("12345");
      await checkOutPage.continueButton.click();
      await expect(page).toHaveURL(process.env.CHECKOUT_STEP_TWO_PAGE_URL);

      await expect(checkOut2Page.inventoryItemName).toHaveText(
        "Sauce Labs Backpack",
      );
      await expect(checkOut2Page.summaryTotalLabel).toHaveText("Total: $32.39");
      await expect(checkOut2Page.finishButton).toBeVisible();
      await checkOut2Page.finishButton.click();
      await expect(page).toHaveURL(process.env.CHECKOUT_COMPLETE_PAGE_URL);

      await expect(checkOutCompletePage.completeHeader).toHaveText(
        "Thank you for your order!",
      );
      await checkOutCompletePage.backHomeButton.click();
      await expect(page).toHaveURL(process.env.INVENTORY_PAGE_URL);
      await expect(inventoryPage.shoppingCartBadge).toBeHidden();
    },
  );
});
