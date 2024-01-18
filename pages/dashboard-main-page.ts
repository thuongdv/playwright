import { Page, expect, test } from "@playwright/test";

export default class DashboardMainPage {
  private readonly settingLocator = this.page.locator('#main-menu .mn-setting');
  private readonly deleteLnk = this.settingLocator.locator('a.delete');

  constructor(private readonly page: Page) { }

  async displays(): Promise<void> {
    await test.step("Verify dashboard main page displays", async () => {
      await expect(this.page.locator("#main-menu li.active a.active")).toHaveText("Execution Dashboard");
    });
  }

  async selectSetting(action: string): Promise<void> {
    await test.step('Select action in setting', async () => {
      await this.settingLocator.hover();
      await this.settingLocator.getByText(action).click();
    })
  }

  async deletePageWhichHasChildAndVerifyDialogMessage(messages: Array<string>): Promise<void> {
    await test.step('Delete page which has child page and verify dialog messages', async () => {

      this.page.once('dialog', async dialog => {
        expect.soft(dialog.message().trim()).toEqual(messages.at(0));
        await dialog.accept();
        this.page.once('dialog', async dialog => {
          expect.soft(dialog.message().trim()).toEqual(messages.at(1));
          await dialog.accept();
        });
      });

      await this.settingLocator.hover();
      await this.deleteLnk.click();
    })
  }

  async deletePageAndVerifyDialogMessage(messages: string): Promise<void> {
    await test.step('Delete page then verify dialog messages', async () => {

      this.page.once('dialog', async dialog => {
        expect.soft(dialog.message().trim()).toEqual(messages);
        await dialog.accept();
      });

      await this.settingLocator.hover();
      await this.deleteLnk.click();
    })
  }

  async selectMainMenu(item: string): Promise<void> {
    await this.page.locator('#main-menu')
      .getByText(item).click();
  }

  async selectMenu(levelItem: string): Promise<void> {
    const menuItems: Array<string> = levelItem.split('->').map(s => s.trim());
    if (menuItems.length > 5) {
      throw new Error('Too many nested pages');
    }

    if (menuItems.length == 1) {
      await this.page.locator('#main-menu')
      .getByText(menuItems[0]).click();
      return;
    }

    for (let i = 0; i < menuItems.length - 1; i++) {
      await this.page.locator('#main-menu')
      .getByText(menuItems[i]).hover();
    }

    await this.page.locator('#main-menu')
      .getByText(menuItems[menuItems.length - 1]).click();
    
  }
}
