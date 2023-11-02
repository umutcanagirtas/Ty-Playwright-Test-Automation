import { playAudit } from "playwright-lighthouse";
import { test, Page, BrowserContext } from "@playwright/test";
import desktopConfig from 'lighthouse/lighthouse-core/config/desktop-config.js';
import {runPerformanceAuditInMobile, runPerformanceAuditInDesktop} from "../utils/helpers"


let pageContext: BrowserContext;
let page: Page;

async function runPerformanceTest(page, url, auditName, viewConfig) {
  await page.goto(url);

  if (viewConfig === "lighthouse:default") {
    await runPerformanceAuditInMobile(page, url, auditName);
  } else {
    await runPerformanceAuditInDesktop(page, viewConfig, url, auditName);
  }
}

test.describe('Lighthouse Performance Test', () => {
  test.beforeEach(async ({ browser }) => {
    pageContext = await browser.newContext();
    page = await pageContext.newPage();
    //await pageManager.getHomePage().open();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('@test @HomePagePerformance', async ({ page }) => {
    await runPerformanceTest(page, '/', 'Desktop - Home Page', desktopConfig);
  });

  test('@test @AboutUsPerformance', async ({ page }) => {
    await runPerformanceTest(page, '/aboutus', 'Desktop - About Page', desktopConfig);
  });

  // test('Mobile - About Page Performance Audit', async ({ page }) => {
  //   await runPerformanceTest(page, '/about', 'Mobile - About Page', 'lighthouse:default');
  // });
});

