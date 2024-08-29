import { devices } from "@playwright/test";
import { testPlanFilter } from "allure-playwright/dist/testplan";
import { PlaywrightTestConfig } from "@playwright/test";
import _ from "underscore";

const RPconfig = {
  apiKey: process.env.RP_API_KEY,
  endpoint: process.env.RP_ENDPOINT,
  project: "playwright-demo",
  launch: "playwright-demo",
  description: "Playwright with Report Portal",
  includeTestSteps: true,
};

const config: PlaywrightTestConfig = {
  reporter: [["@reportportal/agent-js-playwright", RPconfig], ["html"]],
};

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const defaultConfig: PlaywrightTestConfig = {
  timeout: 15 * 1000,
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  grep: testPlanFilter(),
  reporter: [["html"], ["allure-playwright"]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    /* Screenshot on failure. */
    screenshot: "only-on-failure",
    // Record video only when retrying a test for the first time.
    video: "on-first-retry",
    // Channel to use, for example "chrome", "chrome-beta", "msedge", "msedge-beta".
    channel: "chrome",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome", viewport: { width: 1600, height: 900 } },
    },
  ],
};

export default process.env.REPORT === "rp" ? _.extend(defaultConfig, config) : defaultConfig;
