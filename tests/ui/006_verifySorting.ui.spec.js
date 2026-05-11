import { test, expect } from "@playwright/test";
import { login } from "../utils/utils_cart.ui.js";
import { InventoryPage } from "../../pages/InventoryPage.js";

test.beforeEach(async ({ page }) => {
  // Go to the starting url before each test and perform login
  await login(page);
});

test.describe("Verify sorting", () => {
  test('ID=006_1, Title="Verify sorting from prices low to high"', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    // select sorting option low to high
    await inventoryPage.sortingDropdown.selectOption("lohi");
    // put all text elements with prices into an array
    const prices = await inventoryPage.inventoryPrices.allTextContents();
    // convert price strings to numbers
    const priceNumbers = prices.map((p) => parseFloat(p.replace("$", "")));
    // copy the array and sort it
    const sorted = [...priceNumbers].sort((a, b) => a - b);
    // verify the original array is in the same order as the sorted array
    expect(priceNumbers).toEqual(sorted);
  });

   test('ID=006_2, Title="Verify sorting from prices high to low"', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    // select sorting option high to low
    await inventoryPage.sortingDropdown.selectOption("hilo");
    // put all text elements with prices into an array
    const prices = await inventoryPage.inventoryPrices.allTextContents();
    // convert price strings to numbers
    const priceNumbers = prices.map((p) => parseFloat(p.replace("$", "")));
    // copy the array and sort it
    const sorted = [...priceNumbers].sort((a, b) => b - a);
    // verify the original array is in the same order as the sorted array
    expect(priceNumbers).toEqual(sorted);
  });

  test('ID=006_3, Title="Verify sorting names from A to Z"', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const stateOfSorting = await inventoryPage.inventoryItemNames;

    await inventoryPage.sortingDropdown.selectOption("az");

    const after = await stateOfSorting.allTextContents();

    const afterLower = after.map((name) => name.toLowerCase());

    const sorted = [...afterLower].sort((a, b) => a.localeCompare(b));

    expect(afterLower).toEqual(sorted);

  });

  test('ID=006_4, Title="Verify sorting names from Z to A"', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const stateOfSorting = await inventoryPage.inventoryItemNames;

    const before = await stateOfSorting.allTextContents();

    await inventoryPage.sortingDropdown.selectOption("za");

    const after = await stateOfSorting.allTextContents();

    const afterLower = after.map((name) => name.toLowerCase());

    const sorted = [...afterLower].sort((a, b) => b.localeCompare(a));

    expect(afterLower).toEqual(sorted);

  });
});
