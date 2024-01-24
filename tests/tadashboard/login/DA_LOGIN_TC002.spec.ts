import { test, expect } from "fixtures/login-fixture";

test("Verify that user fails to login specific repository successfully via Dashboard login page with incorrect credentials", async ({
  loginPage,
  page,
}) => {
  const loginMessage = "Username or password is invalid";

  // Navigate to Dashboard login page
  await loginPage.open();

  page.once("dialog", async (dialog) => {
    expect.soft(dialog.message()).toEqual(loginMessage);
    await dialog.dismiss();
  });

  // Enter invalid username and password
  // Click on "Login" button
  await loginPage.login("incorrect", "credential");

  // Verify that Dashboard Error message "Username or password is invalid" appears
  await loginPage.displays();
});
