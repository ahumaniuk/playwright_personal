export class InventoryPage {
    constructor(page) {
        this.page = page;
        // locators
        this.burgerMenuButton = page.locator('#react-burger-menu-btn');
        this.menuItems = page.locator('.bm-menu .bm-item.menu-item');
        this.LogoutButton = page.locator('[data-test="logout-sidebar-link"]');

        this.inventoryList = page.locator('[data-test="inventory-list"]');
        this.inventoryContainer = page.locator('#inventory_container');
        this.inventoryItems = page.locator('.inventory_item');
        this.inventoryPrices = page.locator('.inventory_item_price');
        this.inventoryItemNames = page.locator('.inventory_item_name');
        
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]'); 
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]'); 
        // Locator to add "sauce Labs Backpack" product to the cart
        this.addToCartBackpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')

        //sorting locators
        this.sortingDropdown = page.locator('[data-test="product-sort-container"]');

        //footer locators
        this.twitterLink = page.locator('[data-test="social-twitter"]');
        this.facebookLink = page.locator('[data-test="social-facebook"]');
        this.linkedInLink = page.locator('[data-test="social-linkedin"]'); 
    }
}