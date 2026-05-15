export class CheckOutPage {
  constructor(page) {
    this.page = page;
    // locators
    this.checkoutContainerForm = page.locator(
      '[data-test="checkout-info-container"]',
    );
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }

  async fillCheckoutInformation(userData) {
    await this.firstNameInput.fill(userData.firstName);
    await this.lastNameInput.fill(userData.lastName);
    await this.postalCodeInput.fill(userData.zipCode);
  }
}
