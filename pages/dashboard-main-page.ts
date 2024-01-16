import { Page, expect, test } from "@playwright/test";

export default class DashboardMainPage {
  constructor(private readonly page: Page) { }

  async displays(): Promise<void> {
    await test.step('Verify dashboard main page displays', async () => {
      await expect(this.page.locator('#main-menu li.active a.active')).toHaveText('Execution Dashboard');
    });
  }
}