import { test } from "@playwright/test";
import Dialog from "pages/dialog";
import LoginPage from "pages/login-page";

test("Verify that user can login specific repository successfully via Dashboard login page with correct credentials @SmokeTest", async ({
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
