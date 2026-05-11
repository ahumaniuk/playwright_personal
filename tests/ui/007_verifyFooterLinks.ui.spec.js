import { test, expect } from "@playwright/test";
import { LoginPage } from '../../pages/loginPage.js';
import { InventoryPage } from '../../pages/InventoryPage.js';
import { users } from '../../test_data/users.js';
import { login } from "../utils/utils_cart.ui.js";

test.describe('Verify Footer', () => {
    test.beforeEach(async ({ page }) => {
        // "User is on the logined into account
        // User is on the inventory page"
        await login(page);
    })

    test('ID=007, Title="Verify Footer Links"', { tag: '@smoke' }, async ({ page, context }) => {
            const inventoryPage = new InventoryPage(page);
            
            const [twitterPage] = await Promise.all([ context.waitForEvent('page'), inventoryPage.twitterLink.click() ]);
            await twitterPage.waitForLoadState();
            await expect(twitterPage).toHaveURL('https://x.com/saucelabs');
            await twitterPage.close();
            await expect(page).toHaveURL(process.env.INVENTORY_PAGE_URL);

            const [facebookPage] = await Promise.all([ context.waitForEvent('page'), inventoryPage.facebookLink.click() ]);
            await facebookPage.waitForLoadState();
            await expect(facebookPage).toHaveURL('https://www.facebook.com/saucelabs');
            await facebookPage.close();
            await expect(page).toHaveURL(process.env.INVENTORY_PAGE_URL);

            const [linkedInPage] = await Promise.all([ context.waitForEvent('page'), inventoryPage.linkedInLink.click() ]);
            await linkedInPage.waitForLoadState();
            await expect(linkedInPage).toHaveURL('https://www.linkedin.com/company/sauce-labs/');
            await linkedInPage.close();
            await expect(page).toHaveURL(process.env.INVENTORY_PAGE_URL);
    })
})