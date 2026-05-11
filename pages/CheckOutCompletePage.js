export class CheckOutCompletePage {
    constructor(page) {
        this.page = page;
        // locators
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }
}