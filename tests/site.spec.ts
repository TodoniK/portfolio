import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { PAGES } from "./routes";

const ORIGIN = "https://julesroyet.dev";

// Pas de fausses visites dans Web Analytics pendant les tests
test.beforeEach(async ({ page }) => {
  await page.route("https://static.cloudflareinsights.com/**", (r) => r.fulfill({ body: "", contentType: "text/javascript" }));
});

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
      await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(4);
      expect((await page.locator('meta[name="description"]').getAttribute("content"))?.length).toBeGreaterThan(50);
      const ld = await page.locator('script[type="application/ld+json"]').textContent();
      expect(() => JSON.parse(ld ?? "")).not.toThrow();
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
      if (info.project.name === "mobile") {
        // the first-visit intro fades letters in under the splash: audit the settled page
        await page.evaluate(() => Promise.all(document.getAnimations().filter((a) => (a as CSSAnimation).animationName === "rise").map((a) => a.finished)));
        const axe = await new AxeBuilder({ page }).exclude(".splash").withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
        const bad = axe.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
        expect(bad.map((v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`)).toEqual([]);
      }
      expect(errors).toEqual([]);
    });
  });
}

test("unknown URLs answer 404 with the themed page", async ({ page }) => {
  const home = { fr: "Retour à l'accueil", en: "Back to home", es: "Volver al inicio" };
  for (const [url, lang] of [["/n-existe-pas", "fr"], ["/en/does-not-exist", "en"], ["/es/no-existe", "es"]] as const) {
    const res = await page.goto(url);
    expect(res?.status()).toBe(404);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.getByRole("link", { name: home[lang] })).toBeVisible();
  }
});

test("language switch keeps the page context", async ({ page }) => {
  await page.goto("/projects/hermes");
  const link = page.locator('a[hreflang="en"]').first();
  await expect(link).toHaveAttribute("href", "/en/projects/hermes");
  await expect(page.locator('a[hreflang="es"]').first()).toHaveAttribute("href", "/es/projects/hermes");
  await page.goto("/en/legal-notice");
  await expect(page.locator('a[hreflang="fr"]').first()).toHaveAttribute("href", "/mentions-legales");
  await expect(page.locator('a[hreflang="es"]').first()).toHaveAttribute("href", "/es/aviso-legal");
});

test("theme toggle follows the system, then remembers the choice", async ({ browser }) => {
  const ctx = await browser.newContext({ colorScheme: "dark" });
  const page = await ctx.newPage();
  await page.goto("/");
  const bg = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const toggle = page.locator("[data-theme-toggle]");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  expect(await bg()).toBe("rgb(10, 10, 11)");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await page.goto("/about");
  expect(await bg()).toBe("rgb(251, 251, 253)");
  await expect(page.locator("[data-theme-toggle]")).toHaveAttribute("aria-pressed", "false");
  await ctx.close();
});

test("light theme passes contrast checks", async ({ browser }, info) => {
  test.skip(info.project.name !== "desktop", "once");
  const ctx = await browser.newContext({ colorScheme: "light", reducedMotion: "reduce" });
  const page = await ctx.newPage();
  for (const path of ["/", "/es/projects/hermes", "/en/about"]) {
    await page.goto(path, { waitUntil: "networkidle" });
    const axe = await new AxeBuilder({ page }).withRules(["color-contrast"]).analyze();
    expect(axe.violations.flatMap((v) => v.nodes.map((n) => n.target.join(" "))), path).toEqual([]);
  }
  await ctx.close();
});

test("suggests the browser language once, without redirecting", async ({ browser }) => {
  const ctx = await browser.newContext({ locale: "es-ES" });
  const page = await ctx.newPage();
  await page.goto("/projects");
  const banner = page.locator('[data-suggest="es"]');
  await expect(banner).toBeVisible();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(banner.getByRole("link")).toHaveAttribute("href", "/es/projects");
  await banner.getByRole("button").click();
  await expect(banner).toBeHidden();
  await page.reload();
  await expect(banner).toBeHidden();
  await page.goto("/es");
  await expect(page.locator("[data-suggest]:visible")).toHaveCount(0);
  await ctx.close();
});

test("rotating words carry their own gradient (WebKit paints clipped text only on the text's own element)", async ({ page }) => {
  await page.goto("/");
  const parts = page.locator(".rotator > *");
  const check = () => parts.evaluateAll((els) => els.map((e) => [e.children.length, getComputedStyle(e).backgroundClip]));
  for (const [kids, clip] of await check()) { expect(kids).toBe(0); expect(clip).toBe("text"); }
  await expect(page.locator(".rotator .ch").first()).toBeAttached({ timeout: 6000 });
  for (const [kids, clip] of await check()) { expect(kids).toBe(0); expect(clip).toBe("text"); }
  // one continuous gradient: each letter's slice is offset by its position in the word
  const offsets = await page.locator(".rotator .ch").evaluateAll((els) => els.map((e) => parseFloat(getComputedStyle(e).backgroundPositionX)));
  expect(offsets[0]).toBe(0);
  expect(offsets.at(-1)!).toBeLessThan(0);
});

test("logo tiles stay square whatever the logo's shape", async ({ page }) => {
  await page.goto("/projects");
  for (const [w, h] of await page.locator("[data-thumb] .logos li").evaluateAll((els) => els.map((e) => [e.getBoundingClientRect().width, e.getBoundingClientRect().height]))) {
    expect(Math.abs(w! - h!)).toBeLessThanOrEqual(1);
  }
});

test("pages do no continuous layout work when idle", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "Chromium metrics, once");
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Performance.enable");
  const layouts = async () => (await cdp.send("Performance.getMetrics")).metrics.find((m) => m.name === "LayoutCount")!.value;
  for (const path of ["/about", "/projects", "/es/contact"]) {
    await page.goto(path, { waitUntil: "load" });
    await page.waitForTimeout(1500);
    const before = await layouts();
    await page.waitForTimeout(2000);
    expect((await layouts()) - before, path).toBeLessThan(10);
  }
});

test("about page shows the real photo, without hover swap", async ({ page }) => {
  for (const [path, alt] of [["/about", "Photo de Jules Royet"], ["/en/about", "Photo of Jules Royet"], ["/es/about", "Foto de Jules Royet"]] as const) {
    await page.goto(path);
    const img = page.locator(".portrait img");
    await expect(img).toHaveCount(1);
    await expect(img).toHaveAttribute("alt", alt);
    expect(await img.evaluate((i: HTMLImageElement) => i.complete && i.naturalWidth > 0)).toBe(true);
  }
  expect(await page.locator("[data-portrait]").count()).toBe(0);
});

test("skip link is the first focusable element", async ({ page }, info) => {
  test.skip(info.project.name === "mobile", "keyboard flow checked on desktop");
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toHaveClass(/skip/);
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("reduced motion: no splash, no Aurora canvas, content visible", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".splash")).toBeHidden();
  await page.waitForTimeout(1500);
  expect(await page.locator("[data-aurora] canvas").count()).toBe(0);
  await page.locator(".pcard").last().scrollIntoViewIfNeeded();
  expect(await page.locator(".grid > li").last().evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
  await ctx.close();
});

test("Aurora loads after the page on desktop, never on touch", async ({ page }, info) => {
  await page.goto("/", { waitUntil: "load" });
  const box = page.locator("[data-aurora]");
  await expect(box).toHaveAttribute("aria-hidden", "true");
  if (info.project.name === "mobile") {
    await page.waitForTimeout(2000);
    expect(await box.getAttribute("data-aurora-state")).toBeNull();
  } else {
    // headless Chromium renders WebGL in software, which the port refuses on purpose
    await expect(box).toHaveAttribute("data-aurora-state", /^(live|software)$/, { timeout: 8000 });
  }
});

test("without JavaScript every card is visible", async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto("/");
  const cards = page.locator(".pcard");
  await expect(cards).toHaveCount(6);
  for (const op of await page.locator(".reveal").evaluateAll((els) => els.map((e) => getComputedStyle(e).opacity))) expect(op).toBe("1");
  await ctx.close();
});

test("no custom cursor and no video anywhere", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(800);
  expect(await page.locator(".tcursor, video").count()).toBe(0);
  expect(await page.evaluate(() => getComputedStyle(document.body).cursor)).toBe("auto");
});

test("headings stay within the type scale on very large screens", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 2560, height: 1440 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  expect(parseFloat(await page.locator(".hero-title .name").evaluate((e) => getComputedStyle(e).fontSize))).toBeLessThanOrEqual(88);
  for (const size of await page.locator("main h2").evaluateAll((els) => els.map((e) => parseFloat(getComputedStyle(e).fontSize)))) expect(size).toBeLessThanOrEqual(44);
  await ctx.close();
});

test("breadcrumb items share a baseline", async ({ page }) => {
  await page.goto("/projects");
  const tops = await page.locator(".crumbs li").evaluateAll((els) => els.map((li) => {
    const r = document.createRange();
    r.selectNodeContents(li.querySelector("a, [aria-current]")!);
    return r.getBoundingClientRect().bottom;
  }));
  expect(tops.length).toBe(2);
  expect(Math.abs(tops[0]! - tops[1]!)).toBeLessThanOrEqual(1);
});

test("project thumbnails name every tool of the stack", async ({ page }) => {
  await page.goto("/projects");
  const thumbs = page.locator("[data-thumb]");
  await expect(thumbs).toHaveCount(10);
  for (const alts of await thumbs.evaluateAll((els) => els.map((t) => [...t.querySelectorAll("img")].map((i) => i.alt)))) {
    expect(alts.length).toBeGreaterThanOrEqual(3);
    for (const a of alts) expect(a.trim().length).toBeGreaterThan(1);
  }
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

test("long copy reads as short paragraphs of two sentences at most", async ({ page }) => {
  for (const path of ["/about", "/projects/hermes", "/es/projects/shopeen"]) {
    await page.goto(path);
    const counts = await page.locator(".text p:not(.first), .main > p:not(.summary)").evaluateAll((ps) => ps.map((p) => (p.textContent ?? "").trim().split(/(?<=[.!?])\s+(?=[\p{Lu}¿¡«"])/u).length));
    expect(counts.length, path).toBeGreaterThan(1);
    for (const n of counts) expect(n, path).toBeLessThanOrEqual(2);
  }
});
