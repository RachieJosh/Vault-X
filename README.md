# VaultX – Playwright Regression Test Suite
 
This repository contains the end-to-end automated regression suite for the **VaultX Crypto Wallet Web App**, built with Playwright and JavaScript. The suite covers all critical user journeys across authentication, wallet operations, transaction management, and session security — including positive, negative, and edge case scenarios.
 
---
 
## Modules Covered
 
- Authentication — Login
- Authentication — Two-Factor Auth (2FA)
- Dashboard
- Transfer — Send
- Transfer — Receive
- Transaction History
- Navigation & Session
**80+ test cases across 7 modules.**
 
---
 
## Tech Stack
 
- **Playwright** (JavaScript)
- **Node.js**
- **Page Object Model (POM)** — applied across all modules
- **dotenv** — environment variable management
- **GitHub Actions** — CI/CD pipeline

## Prerequisites
 
- Node.js v18+
- npm v9+
Verify your setup:
 
```
node -v
npm -v
```
 
---
 
## How to Run Tests
 
**Install dependencies**
 
```
npm install
```
 
**Install Playwright browsers**
 
```
npx playwright install --with-deps chromium
```
 
**Run all tests**
 
```
npm test
```
 
**Run a specific suite**
 
```
npx playwright test tests/auth.login.spec.js
```
 
**Run with a visible browser**
 
```
npm run test:headed
```
 
**View HTML report**
 
```
npm run test:report
```

## Page Object Model
 
All selectors and actions are defined in the `pages/` folder. Each file maps to one section of the app. Tests never touch the DOM directly — they always go through a page object.
 
| Page Object | Route |
|---|---|
| LoginPage.js | /login |
| TwoFAPage.js | /login (2FA step) |
| DashboardPage.js | /dashboard |
| SendPage.js | /transfer (send mode) |
| ReceivePage.js | /transfer (receive mode) |
| HistoryPage.js | /history |
| NavPage.js | Global navigation bar |
 
All selectors use `data-testid` attributes, making them stable and independent of UI styling or layout changes.
 
---
 
## Shared Login Helper
 
Since most tests require a fully authenticated session, a shared helper at `tests/helpers/login.js` handles the full login → 2FA flow in one call:
 
```js
import { loginUser } from './helpers/login.js';
 
test.beforeEach(async ({ page }) => {
  await loginUser(page);
});
```
 
---
 
## CI/CD
 
Tests run automatically on every push to `main` or `develop`, and on every pull request targeting `main`, via GitHub Actions.
 
The workflow file lives at `ci/playwright.yml`. After every run, the HTML report is uploaded as a downloadable artifact and retained for 7 days.
 
 ## On Failure
 
Playwright automatically captures the following on any failed test:
 
- Screenshot of the failing state
- Video recording of the full test run
- Trace file — viewable at [trace.playwright.dev](https://trace.playwright.dev)
---
