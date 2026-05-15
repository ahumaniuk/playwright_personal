import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import { InventoryPage } from "../../pages/InventoryPage.js";
import { CartPage } from "../../pages/CartPage.js";
import { CheckOutPage } from "../../pages/CheckOutPage.js";
import { users } from "../../env/test_data/users.js";
import { login } from "../utils/utils_cart.ui.js";

test.describe("Tests with negative scenarios on checkout", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test(
    'ID=009, Title="Verify Checkout without products"',
    { tag: ["@negative", "@medium"] },
    async ({ page, context }) => {
      const inventoryPage = new InventoryPage(page);
      const cartPage = new CartPage(page);
      const checkOutPage = new CheckOutPage(page);
      await expect(inventoryPage.shoppingCartBadge).toBeHidden();

      await inventoryPage.openCart();
      await expect(cartPage.cartItem).toBeHidden();
      await expect(cartPage.inventoryItem).toHaveCount(0);

      await cartPage.checkoutButton.click();

      await expect(page).toHaveURL(process.env.CART_PAGE_URL);
      await expect(page.locator('[data-test="error"]')).toHaveText(
        "Your cart is empty",
      );
    },
  );
});
