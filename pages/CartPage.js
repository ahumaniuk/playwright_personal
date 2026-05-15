export class CartPage {
  constructor(page) {
    this.page = page;
    // locators
    this.shoppingCart = page.locator('[data-test="shopping-cart-link"]');
    this.cartList = page.locator('[data-test="cart-list"]');
    this.cartItem = page.locator('[data-test="item-4-title-link"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.inventoryItem = page.locator(".cart_item");
  }

  
}
