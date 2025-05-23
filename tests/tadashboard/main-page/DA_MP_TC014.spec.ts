import { format } from "date-fns";
import { test } from "fixtures/user-based-worker-fixture";
import DashboardMainPage from "pages/dashboard-main-page";

let dashboardMPage: DashboardMainPage;
const pageName = format(new Date(), "yyyy-MM-dd")

test("Verify that 'Public' pages can be visible and accessed by all users of working repository", async ({
  dashboardMainPage,
  newPageForm,
}) => {
  dashboardMPage = dashboardMainPage;

  // Navigate to Dashboard login page
  // Log in specific repository with valid account
  // Go to Global Setting -> Add page
  await dashboardMainPage.selectSetting("Add Page");

  // Enter Page Name field
  // Check Public checkbox
  // Click OK button
  await newPageForm.create({ pageName: pageName, public: true });

  // Click on Log out link
  // Log in with another valid account
  // Check newly added page is visible
});

test.afterEach("Delete page", async () => {
  await dashboardMPage.selectMenu(pageName);
  await dashboardMPage.deletePageAndVerifyDialogMessage();
});
