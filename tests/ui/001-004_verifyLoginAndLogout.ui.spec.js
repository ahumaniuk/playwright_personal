import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import { InventoryPage } from "../../pages/InventoryPage.js";
import { checkoutUser  } from "../../test_data/users.js";
import { config } from "../../config/env.config.js";

test.describe("Logins", () => {
  test(
    'ID=001, Title="Verify Valid Login"',
    { tag: "@smoke" },
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.open();
      await loginPage.login(config.users.standard.username, config.users.standard.password);
    },
  );

  test(
    'ID=002, Title="Login with invalid password"',
    { tag: "@smoke" },
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.open();
      await loginPage.login(config.users.invalid.username, config.users.invalid.password);
      await expect(loginPage.Xicon1).toBeVisible();
      await expect(loginPage.Xicon2).toBeVisible();
      await expect(loginPage.errorEpicSadFace).toBeVisible();
    },
  );

  test(
    'ID=003, Title="Login with locked out test login"',
    { tag: "@smoke" },
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.open();
      await loginPage.login(config.users.locked.username, config.users.locked.password);
      await expect(loginPage.Xicon1).toBeVisible();
      await expect(loginPage.Xicon2).toBeVisible();
      await expect(loginPage.errorEpicSadFaceForLockedUser).toBeVisible();
    },
  );

  test('ID=004, Title="logout"', { tag: "@smoke" }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(config.users.standard.username, config.users.standard.password);
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.burgerMenuButton.click();

    await expect(inventoryPage.burgerContainer).toBeVisible();
    await expect(inventoryPage.menuItems).toHaveCount(4);

    await inventoryPage.logoutButton.click();
    await expect(page).toHaveURL(process.env.BASE_URL);

    await expect(loginPage.usernameInput).toBeEmpty();
    await expect(loginPage.passwordInput).toBeEmpty();
  });
});
