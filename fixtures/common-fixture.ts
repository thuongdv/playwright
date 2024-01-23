import { test as base } from "@playwright/test";
import DashboardMainPage from "pages/dashboard-main-page";
import Dialog from "pages/dialog";
import LoginPage from "pages/login-page";
import NewPageForm from "pages/new-page-form";

// Declare the types of your fixtures.
type CommonFixture = {
  loginPage: LoginPage;
  dashboardMainPage: DashboardMainPage;
  dialog: Dialog;
  newPageForm: NewPageForm;
};

// Extend base test.
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<CommonFixture>({
  loginPage: async ({ page }, use) => {
    // Set up the fixture.
    const loginPage = new LoginPage(page);
    // Use the fixture value in the test.
    await use(loginPage);
  },
  dashboardMainPage: async ({ page }, use) => {
    await use(new DashboardMainPage(page));
  },
  dialog: async ({ page }, use) => {
    await use(new Dialog(page));
  },
  newPageForm: async ({ page }, use) => {
    await use(new NewPageForm(page));
  },
});
export { expect, Page, Locator } from "@playwright/test";
