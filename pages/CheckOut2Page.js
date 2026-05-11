export class CheckOut2Page {
    constructor(page) {
        this.page = page;
        // locators
        this.finishButton = page.locator('[data-test="finish"]');
        this.inventoryItemName = page.locator('.inventory_item_name');
        this.summaryTotalLabel = page.locator('.summary_total_label');
        this.finishButton = page.locator('[data-test="finish"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');   
    }
}