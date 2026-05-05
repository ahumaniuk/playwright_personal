import { test, expect } from "playwright/test";
import { login, addBackpackToCart } from "../utils/utils_cart.ui.js";

test.beforeEach(async ({ page }) => {
  // Go to the starting url before each test and perform login
  await login(page);
});

test.describe("Verify sorting", () => {
  test('ID=2, Title="Verify sorting from prices low to high"', async ({ page }) => {
    // select sorting option low to high
    await page
      .locator('[data-test="product-sort-container"]')
      .selectOption("lohi");
    // put all text elements with prices into an array
    const prices = await page
      .locator(".inventory_item_price")
      .allTextContents();
    // convert price strings to numbers
    const priceNumbers = prices.map((p) => parseFloat(p.replace("$", "")));
    // copy the array and sort it
    const sorted = [...priceNumbers].sort((a, b) => a - b);
    // verify the original array is in the same order as the sorted array
    expect(priceNumbers).toEqual(sorted);
  });

  test('ID=3, Title="Verify sorting names from A to Z"', async ({ page }) => {
    const stateOfSorting = page.locator(".inventory_item_name");

    const before = await stateOfSorting.allTextContents();

    await page
      .locator('[data-test="product-sort-container"]')
      .selectOption("az");

    const after = await stateOfSorting.allTextContents();

    const afterLower = after.map((name) => name.toLowerCase());

    const sorted = [...afterLower].sort((a, b) => a.localeCompare(b));

    expect(afterLower).toEqual(sorted);

  });
});
