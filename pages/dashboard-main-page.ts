import { Page, expect } from "@playwright/test";

export default class DashboardMainPage {
  constructor(private readonly page: Page) {}

  async displays(): Promise<void> {
    await expect(this.page.locator('#main-menu li.active a.active')).toHaveText('Execution Dashboard');
  }
}