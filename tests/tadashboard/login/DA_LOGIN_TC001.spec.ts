import { test } from "@playwright/test";
import DashboardMainPage from "pages/dashboard-main-page";
import LoginPage from "pages/login-page";
import users from "../../../data/users.json";

test("Verify that user can login specific repository successfully via Dashboard login page with correct credentials @SmokeTest", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const dashboardMainPage = new DashboardMainPage(page);

  // Navigate to Dashboard login page
  await loginPage.open();

  // Enter valid username and password
  // Click on "Login" button
  await loginPage.login(users.adminUser.username, users.adminUser.password);

  // Verify that Dashboard Mainpage appears
  await dashboardMainPage.displays();
});