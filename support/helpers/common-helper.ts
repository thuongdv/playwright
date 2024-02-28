export default class CommonHelper {
  static async delay(miliseconds: number): Promise<void> {
    new Promise((resolve) => setTimeout(resolve, miliseconds));
  }
}
