import { Locator, Page, test } from "@playwright/test";

export type NewPageData = {
  pageName: string;
  parentPage?: string;
  numberOfColumns?: number;
  displayAfter?: string;
  public?: boolean;
};

export default class NewPage {
  private readonly pageLocator: Locator = this.page.locator("#div_popup");
  private readonly pageNameTxt: Locator = this.pageLocator.locator("#name");
  private readonly parentPageCbx: Locator = this.pageLocator.locator("#parent");
  private readonly okBtn: Locator = this.pageLocator.locator("#OK");

  constructor(private readonly page: Page) {}

  async create(data: NewPageData): Promise<void> {
    await test.step("Create new page", async () => {
      if (data.pageName !== undefined) {
        await this.pageNameTxt.fill(data.pageName);
      }
      if (data.parentPage !== undefined) {
        await this.parentPageCbx.selectOption(data.parentPage);
      }
      await this.okBtn.click();
    });
  }
}
