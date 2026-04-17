import { test, expect } from "playwright/test";

export async function login(page) {
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
}

export async function addBackpackToCart(page) {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
}