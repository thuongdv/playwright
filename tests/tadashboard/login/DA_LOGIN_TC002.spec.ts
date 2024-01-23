import { test } from "fixtures/common-fixture";

test("Verify that user fails to login specific repository successfully via Dashboard login page with incorrect credentials", async ({
  loginPage,
  dialog,
}) => {
  const loginMessage = "Username or password is invalid";

  // Navigate to Dashboard login page
  await loginPage.open();

  // Enter invalid username and password
  // Click on "Login" button
  await loginPage.login("incorrect", "credential");

  // Verify that Dashboard Error message "Username or password is invalid" appears
  await dialog.handleDialog();
  await dialog.verifyMessageDisplays(loginMessage);
  await loginPage.displays();
});
