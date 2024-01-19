import { test } from "@playwright/test";
import DashboardMainPage from "pages/dashboard-main-page";
import LoginPage from "pages/login-page";
import users from "../../../data/users.json";
import NewPageForm from "pages/new-page-form";
import { DateTimeHelper } from "support/helpers/date-time-helper";

test(
  'Verify that user can remove any main parent page except "Overview" page successfully ' +
    "and the order of pages stays persistent as long as there is not children page under it",
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const newPage = new NewPageForm(page);

    const parentPageName = DateTimeHelper.getToday();
    const chillPageName = "Child " + DateTimeHelper.getToday();
    const deletePageMsg = "Are you sure you want to remove this page?";

    // Navigate to Dashboard login page
    await loginPage.open();

    // Log in specific repository with valid account
    await loginPage.login(users.adminUser.username, users.adminUser.password, "SampleRepository");

    // Add a new parent page
    await dashboardMainPage.selectSetting("Add Page");
    await newPage.create({ pageName: parentPageName });

    // Add a children page of newly added page
    await dashboardMainPage.selectSetting("Add Page");
    await newPage.create({ pageName: chillPageName, parentPage: parentPageName });

    // Click on parent page
    await dashboardMainPage.selectMenu(parentPageName);

    // Click "Delete" link
    // Check confirm message "Are you sure you want to remove this page?" appears
    // Click OK button
    // Check warning message "Can not delete page 'Test' since it has children page(s)" appears
    // Click OK button
    const msg = [deletePageMsg, `Cannot delete page '${parentPageName}' since it has child page(s).`];
    await dashboardMainPage.deletePageWhichHasChildAndVerifyDialogMessage(msg);

    // Click on children page
    await dashboardMainPage.selectMenu(`${parentPageName}->${chillPageName}`);

    // Click "Delete" link
    // Check confirm message "Are you sure you want to remove this page?" appears
    // Click OK button
    await dashboardMainPage.deletePageAndVerifyDialogMessage(deletePageMsg);

    // Check children page is deleted

    // Click on parent page
    await dashboardMainPage.selectMenu(parentPageName);

    // Click "Delete" link
    // Check confirm message "Are you sure you want to remove this page?" appears
    // Click OK button
    await dashboardMainPage.deletePageAndVerifyDialogMessage(deletePageMsg);

    // Check parent page is deleted
    // Click on "Overview" page
    // Check "Delete" link disappears
  },
);
