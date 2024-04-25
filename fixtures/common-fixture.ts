import { test as base } from "@playwright/test";
import DashboardMainPage from "pages/dashboard-main-page";
import LoginPage from "pages/login-page";
import NewPageForm from "pages/new-page-form";
import users from "fixtures/data/users.json";

// Declare the types of your fixtures.
type CommonFixture = {
  dashboardMainPage: DashboardMainPage;
  newPageForm: NewPageForm;
};

export type Options = { defaultRepo: string };

// Extend base test.
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<Options & CommonFixture>({
  // Define an option and provide a default value.
  // We can later override it in the config.
  defaultRepo: ["SampleRepository", { option: true }],

  dashboardMainPage: async ({ page, defaultRepo }, use) => {
    // Set up the fixture.
    const loginPage = new LoginPage(page);
    // Use the fixture value in the test.
    // Navigate to Dashboard login page
    await loginPage.open();

    // Log in specific repository with valid account
    await loginPage.login(users.adminUser.username, users.adminUser.password, defaultRepo);
    // await use(loginPage);
    await use(new DashboardMainPage(page));
  },
  newPageForm: async ({ page }, use) => {
    await use(new NewPageForm(page));
  },
});

export { expect, Page, Locator } from "@playwright/test";
