# Playwright Automation Project

UI and API automated tests created with Playwright and JavaScript.

## Tech Stack

- Playwright
- JavaScript
- Node.js
- GitHub Actions

## Project Structure

tests/
pages/
env/
.github/workflows/

## Installation

npm install

## Run Tests

Run all tests:

npx playwright test

Run smoke tests:

npx playwright test --grep @smoke

Run headed mode:

npx playwright test --headed

## Reports

Show Playwright report:

npx playwright show-report