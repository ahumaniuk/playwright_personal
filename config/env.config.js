import dotenv from 'dotenv';
import path from 'path';

// define environment
const ENV = process.env.ENV || 'dev';

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${ENV}`)
});

export const config = {
  env: ENV,

  baseURL: process.env.BASE_URL,

  pages: {
    inventory: process.env.INVENTORY_PAGE_URL,
    cart: process.env.CART_PAGE_URL,
    checkoutStepOne: process.env.CHECKOUT_STEP_ONE_PAGE_URL,
    checkoutStepTwo: process.env.CHECKOUT_STEP_TWO_PAGE_URL,
    checkoutComplete: process.env.CHECKOUT_COMPLETE_PAGE_URL,
  },

  users: {
    standard: {
      username: process.env.STANDARD_USER,
      password: process.env.STANDARD_PASSWORD,
    },

    locked: {
      username: process.env.LOCKED_USER,
      password: process.env.LOCKED_PASSWORD,
    },

    problem: {
      username: process.env.PROBLEM_USER,
      password: process.env.PROBLEM_PASSWORD,
    },
    invalid: {
        username: 'standard_user',
        password: '11111'
    }
  }
};