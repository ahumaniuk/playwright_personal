import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import { InventoryPage } from "../../pages/InventoryPage.js";
import { checkoutUser  } from "../../test_data/users.js";
import { config } from "../../config/env.config.js";

test.describe("Verify Footer", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(config.users.standard.username, config.users.standard.password);
  });

  test(
    'ID=007, Title="Verify Footer Links"',
    { tag: "@smoke" },
    async ({ page, context }) => {
      const inventoryPage = new InventoryPage(page);

      const twitterPage = await inventoryPage.openExternalPage(
        context,
        inventoryPage.twitterLink,
      );

      await expect(twitterPage).toHaveURL("https://x.com/saucelabs");
      await twitterPage.close();
      await expect(page).toHaveURL(process.env.INVENTORY_PAGE_URL);

      const facebookPage = await inventoryPage.openExternalPage(
        context,
        inventoryPage.facebookLink
      );
      await expect(facebookPage).toHaveURL(
        "https://www.facebook.com/saucelabs",
      );
      await facebookPage.close();
      await expect(page).toHaveURL(process.env.INVENTORY_PAGE_URL);

      const linkedInPage = await inventoryPage.openExternalPage(
        context,
        inventoryPage.linkedInLink
      );
      
      await expect(linkedInPage).toHaveURL(
        "https://www.linkedin.com/company/sauce-labs/",
      );
      await linkedInPage.close();
      await expect(page).toHaveURL(process.env.INVENTORY_PAGE_URL);
    },
  );
});
