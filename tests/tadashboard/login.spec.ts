import { expect, test } from '@playwright/test';
import DashboardMainPage from 'pages/dashboard-main-page';
import LoginPage from 'pages/login-page';

test('Verify that user can login specific repository successfully via Dashboard login page with correct credentials @SmokeTest', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.go();
  await loginPage.login('administrator', '');

  const dashboardMainPage = new DashboardMainPage(page);
  await dashboardMainPage.displays();
})

test('Verify that user fails to login specific repository successfully via Dashboard login page with incorrect credentials', async ({ page }) => {
  const loginMessage = 'Username or password is invalid';
  const loginPage = new LoginPage(page);
  await loginPage.go();
  page.on('dialog', async dialog => {
    expect(dialog.message()).toBe(loginMessage);
    await dialog.dismiss();
  });
  await loginPage.login('incorrect', 'credential');
})