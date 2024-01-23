import { test } from "fixtures/common-fixture";
import { DateTimeHelper } from "support/helpers/date-time-helper";

test("Verify that 'Public' pages can be visible and accessed by all users of working repository", async ({
  dashboardMainPage,
  newPageForm,
}) => {
  const parentPageName = DateTimeHelper.getToday();

  // Navigate to Dashboard login page
  // Log in specific repository with valid account
  // Go to Global Setting -> Add page
  await dashboardMainPage.selectSetting("Add Page");

  // Enter Page Name field
  // Check Public checkbox
  // Click OK button
  await newPageForm.create({ pageName: parentPageName, public: true });

  // Click on Log out link
  // Log in with another valid account
  // Check newly added page is visibled
});
