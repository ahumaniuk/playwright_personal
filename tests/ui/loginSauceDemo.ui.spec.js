import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Go to the starting url before each test and perform login
  await page.goto('/');
});

test.describe('Login page', () => {

    test('ID=1, Title="Perform login"', { tag: '@smoke' }, async ({ page }) => {
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

})


});