import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import { users } from '../../test_data/users.js';
import { login } from "../utils/utils_cart.ui.js";


test.describe('Logins', () => {

    test('ID=001, Title="Verify Valid Login"', { tag: '@smoke' }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(users.standard.username, users.standard.password);
})

    test('ID=002, Title="Login with invalid password"', { tag: '@smoke' }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(users.invalid.username, users.invalid.password)
        await expect(loginPage.Xicon1).toBeVisible();
        await expect(loginPage.Xicon2).toBeVisible();
        await expect(loginPage.errorEpicSadFace).toBeVisible();
})

test('ID=003, Title="Login with locked out test login"', { tag: '@smoke' }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(users.locked.username, users.locked.password)
        await expect(loginPage.Xicon1).toBeVisible();
        await expect(loginPage.Xicon2).toBeVisible();
        await expect(loginPage.errorEpicSadFaceForLockedUser).toBeVisible();
})

        
test.describe('Logouts', () => {

test.beforeEach(async ({ page }) => {
  // Go to the starting url and perform login
  await login(page);});

test( 'ID=004, Title="logout"', { tag: '@smoke' }, async ({page}) =>{
       //Step1: Click on the "Burger" button at the top left corner
        await page.locator('#react-burger-menu-btn').click();
        //Expected result: Menu is expanded, 4 items are displayed
        await expect(page.locator('.bm-item-list')).toBeVisible(); 
        const menuItems = page.locator('.bm-menu .bm-item.menu-item');
        await expect(menuItems).toHaveCount(4);
        //Step2: Click on the "Logout" menu item
        await page.locator('[data-test="logout-sidebar-link"]').click();  
        //Expected result: User are redirecred to the "Login" page, "Username" and "Password" field are empty
        await expect(page).toHaveURL(process.env.BASE_URL);
        await expect(page.locator('[data-test="username"]')).toBeEmpty();
        await expect(page.locator('[data-test="password"]')).toBeEmpty();

    })
})

});