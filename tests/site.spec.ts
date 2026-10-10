import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { PAGES } from "./routes";

const ORIGIN = "https://julesroyet.dev";

for (const { locale, path } of PAGES) {
  test.describe(path, () => {
    test("renders, metadata, a11y", async ({ page }, info) => {
      const errors: string[] = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      page.on("pageerror", (e) => errors.push(e.message));
      const res = await page.goto(path, { waitUntil: "networkidle" });
      expect(res?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", ORIGIN + path);
      await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(3);
      expect((await page.locator('meta[name="description"]').getAttribute("content"))?.length).toBeGreaterThan(50);
      const ld = await page.locator('script[type="application/ld+json"]').textContent();
      expect(() => JSON.parse(ld ?? "")).not.toThrow();
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
      if (info.project.name === "mobile") {
        const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
        const bad = axe.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
        expect(bad.map((v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`)).toEqual([]);
      }
      expect(errors).toEqual([]);
    });
  });
}

test("unknown URLs answer 404 with the themed page", async ({ page }) => {
  for (const [url, lang] of [["/n-existe-pas", "fr"], ["/en/does-not-exist", "en"]] as const) {
    const res = await page.goto(url);
    expect(res?.status()).toBe(404);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.getByRole("link", { name: lang === "fr" ? "Retour à l'accueil" : "Back to home" })).toBeVisible();
  }
});

test("language switch keeps the page context", async ({ page }) => {
  await page.goto("/projects/hermes");
  const link = page.locator('a[hreflang="en"]').first();
  await expect(link).toHaveAttribute("href", "/en/projects/hermes");
  await page.goto("/en/legal-notice");
  await expect(page.locator('a[hreflang="fr"]').first()).toHaveAttribute("href", "/mentions-legales");
});

test("skip link is the first focusable element", async ({ page }, info) => {
  test.skip(info.project.name === "mobile", "keyboard flow checked on desktop");
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toHaveClass(/skip/);
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("reduced motion: no splash, no curtain, no custom cursor, content visible", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page.locator(".splash")).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.classList.contains("has-cursor"))).toBe(false);
  await page.locator(".w-item").first().scrollIntoViewIfNeeded();
  expect(await page.locator(".w-item").first().evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
  expect(await page.locator("video").count()).toBe(0);
  await ctx.close();
});

test("touch devices never get the custom cursor", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile");
  await page.goto("/");
  await page.waitForTimeout(500);
  expect(await page.evaluate(() => document.documentElement.classList.contains("has-cursor"))).toBe(false);
});

test("project filter shows only the selected area", async ({ page }) => {
  await page.goto("/projects");
  await page.locator('label:has(input[value="systemes-ia"])').click();
  const visible = await page.locator(".grid > li:visible").count();
  expect(visible).toBe(4);
});

test("every internal link resolves", async ({ request }) => {
  test.setTimeout(120_000);
  const seen = new Set<string>(), inbound = new Map<string, number>();
  for (const { path } of PAGES) {
    const html = await (await request.get(path)).text();
    for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
      const h = m[1]!;
      if (h === path) continue;
      inbound.set(h, (inbound.get(h) ?? 0) + 1);
      seen.add(h);
    }
  }
  for (const h of seen) expect((await request.get(h)).status(), h).toBeLessThan(400);
  for (const { path } of PAGES) expect(inbound.get(path) ?? 0, `orphan page ${path}`).toBeGreaterThan(0);
});
