export class LoginPage {
  constructor(page) {
    this.page = page;
    // locators
    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.Xicon1 = page.locator('[data-icon="times-circle"]').nth(0);
    this.Xicon2 = page.locator('[data-icon="times-circle"]').nth(1);
    this.errorEpicSadFace = page.locator('[data-test="error-button"]');
    this.errorEpicSadFaceForLockedUser = page.getByText(
      "Epic sadface: Sorry, this user has been locked out.",
      { exact: true },
    );
    
  }
  async open() {
    await this.page.goto("/");
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
  
}
