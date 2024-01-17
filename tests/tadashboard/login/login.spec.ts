import { test } from "@playwright/test";
import DashboardMainPage from "pages/dashboard-main-page";
import LoginPage from "pages/login-page";
import Dialog from "pages/dialog";
import users from "../../../data/users.json";

test("Verify that user can login specific repository successfully via Dashboard login page with correct credentials @SmokeTest", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(users.adminUser.username, users.adminUser.password);

  const dashboardMainPage = new DashboardMainPage(page);
  await dashboardMainPage.displays();
});

test("Verify that user fails to login specific repository successfully via Dashboard login page with incorrect credentials", async ({
  page,
}) => {
  const loginMessage = "Username or password is invalid";
  const loginPage = new LoginPage(page);
  const dialog = new Dialog(page);

  await loginPage.open();
  await loginPage.login("incorrect", "credential");
  await dialog.handleDialog();
  await dialog.verifyMessageDisplays(loginMessage);
  await loginPage.displays();
});
