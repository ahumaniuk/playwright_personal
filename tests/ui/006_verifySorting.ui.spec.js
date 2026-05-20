import { test, expect } from "@playwright/test";
import { InventoryPage } from "../../pages/InventoryPage.js";
import { LoginPage } from "../../pages/LoginPage.js";
import { config } from "../../config/env.config.js";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(config.users.standard.username, config.users.standard.password);
});

test.describe("Verify sorting", () => {
  test('ID=006_1, Title="Verify sorting from prices low to high"', async ({
    page,
  }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.setSortingFromLowToHigh()
    const prices = await inventoryPage.inventoryPrices.allTextContents();
    const priceNumbers = prices.map((p) => parseFloat(p.replace("$", "")));
    const sorted = [...priceNumbers].sort((a, b) => a - b);
    expect(priceNumbers).toEqual(sorted);
  });

  test('ID=006_2, Title="Verify sorting from prices high to low"', async ({
    page,
  }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.setSortingFromHighToLow()
    const prices = await inventoryPage.inventoryPrices.allTextContents();
    const priceNumbers = prices.map((p) => parseFloat(p.replace("$", "")));
    const sorted = [...priceNumbers].sort((a, b) => b - a);
    expect(priceNumbers).toEqual(sorted);
  });

  test('ID=006_3, Title="Verify sorting names from A to Z"', async ({
    page,
  }) => {
    const inventoryPage = new InventoryPage(page);
    const stateOfSorting = await inventoryPage.inventoryItemNames;

    await inventoryPage.setSortingFromAtoZ();

    const after = await stateOfSorting.allTextContents();

    const afterLower = after.map((name) => name.toLowerCase());

    const sorted = [...afterLower].sort((a, b) => a.localeCompare(b));

    expect(afterLower).toEqual(sorted);
  });

  test('ID=006_4, Title="Verify sorting names from Z to A"', async ({
    page,
  }) => {
    const inventoryPage = new InventoryPage(page);
    const stateOfSorting = await inventoryPage.inventoryItemNames;

    const before = await stateOfSorting.allTextContents();

    await inventoryPage.setSortingFromZtoA();

    const after = await stateOfSorting.allTextContents();

    const afterLower = after.map((name) => name.toLowerCase());

    const sorted = [...afterLower].sort((a, b) => b.localeCompare(a));

    expect(afterLower).toEqual(sorted);
  });
});
