import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import { users } from '../../test_data/users.js';


// test.beforeEach(async ({ page }) => {
//   // Go to the starting url before each test and perform login
//   await page.goto('/');
// });

test.describe('Login page', () => {

    test('ID=1, Title="Perform login for standard user"', { tag: '@smoke' }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(users.standard.username, users.standard.password);

})


});