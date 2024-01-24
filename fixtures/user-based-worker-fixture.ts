import { test as base } from "@playwright/test";
import DashboardMainPage from "pages/dashboard-main-page";
import LoginPage from "pages/login-page";
import NewPageForm from "pages/new-page-form";
import users from "data/users.json";

// Declare the types of your fixtures.
type CommonFixture = {
  dashboardMainPage: DashboardMainPage;
  newPageForm: NewPageForm;
};

export type Options = { defaultRepo: string };

type Account = {
  username: string;
  password: string;
};

// Extend base test.
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<Options & CommonFixture, { account: Account }>({
  // Define an option and provide a default value.
  // We can later override it in the config.
  defaultRepo: ["SampleRepository", { option: true }],

  // eslint-disable-next-line no-empty-pattern
  account: [
    async ({}, use, workerInfo) => {
      // Unique username.
      const adminUser: string = `adminUser` + workerInfo.workerIndex;
      const username: string = users[adminUser as keyof typeof users]["username"];
      const password: string = users[adminUser as keyof typeof users]["password"];

      // Use the account value.
      await use({ username, password });
    },
    { scope: "worker" },
  ],

  dashboardMainPage: async ({ page, defaultRepo, account }, use) => {
    // Sign in with our account.
    const { username, password } = account;

    // Set up the fixture.
    const loginPage = new LoginPage(page);

    // Navigate to Dashboard login page
    await loginPage.open();

    // Log in specific repository with valid account
    await loginPage.login(username, password, defaultRepo);

    // Use the fixture value in the test.
    await use(new DashboardMainPage(page));
  },

  newPageForm: async ({ page }, use) => {
    await use(new NewPageForm(page));
  },
});
export { expect, Page, Locator } from "@playwright/test";
