import { Page, test, Locator } from "fixtures/common-fixture";

export type NewPageData = {
  pageName: string;
  parentPage?: string;
  numberOfColumns?: number;
  displayAfter?: string;
  public?: boolean;
};

export default class NewPageForm {
  private readonly pageLocator: Locator = this.page.locator("#div_popup");
  private readonly pageNameTxt: Locator = this.pageLocator.locator("#name");
  private readonly parentPageCbx: Locator = this.pageLocator.locator("#parent");
  private readonly okBtn: Locator = this.pageLocator.locator("#OK");

  constructor(private readonly page: Page) {}

  async create(data: NewPageData): Promise<void> {
    await test.step("Create new page", async () => {
      data.pageName && (await this.pageNameTxt.fill(data.pageName));
      data.parentPage && (await this.parentPageCbx.selectOption(data.parentPage));

      await this.okBtn.click();
    });
  }
}
