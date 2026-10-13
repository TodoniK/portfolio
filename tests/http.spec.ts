import { test, expect } from "@playwright/test";
import { PAGES } from "./routes";

test.describe.configure({ mode: "serial" });
test.beforeEach(({}, info) => test.skip(info.project.name !== "desktop", "HTTP checks once"));

test("security headers on HTML", async ({ request }) => {
  const r = await request.get("/");
  const h = r.headers();
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["content-security-policy"]).not.toContain("unsafe-eval");
  expect(h["content-security-policy"]).toMatch(/script-src 'self'[^;]*'sha256-/);
  expect(h["strict-transport-security"]).toMatch(/max-age=31536000/);
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(h["permissions-policy"]).toContain("camera=()");
  expect(h["cache-control"]).toMatch(/max-age=0|must-revalidate/);
});

test("hashed assets are immutable", async ({ request, page }) => {
  await page.goto("/");
  const css = await page.locator('link[rel="preload"][as="font"]').getAttribute("href");
  const r = await request.get(css!);
  expect(r.headers()["cache-control"]).toContain("immutable");
});

test("sitemap lists every page with alternates", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const { path } of PAGES) expect(xml).toContain(`<loc>https://julesroyet.dev${path}</loc>`);
  expect(xml.match(/hreflang="x-default"/g)?.length).toBe(PAGES.length);
});

test("robots, llms.txt and OG images", async ({ request, page }) => {
  expect(await (await request.get("/robots.txt")).text()).toContain("Sitemap: https://julesroyet.dev/sitemap.xml");
  const llms = await (await request.get("/llms.txt")).text();
  expect(llms).toMatch(/^# Jules Royet/);
  expect((await request.get("/llms-full.txt")).status()).toBe(200);
  for (const { path } of PAGES) {
    await page.goto(path);
    const og = new URL((await page.locator('meta[property="og:image"]').getAttribute("content"))!);
    const r = await request.get(og.pathname);
    expect(r.status(), og.pathname).toBe(200);
    expect(r.headers()["content-type"]).toContain("image/jpeg");
  }
});

test("legacy resume path redirects", async ({ request }) => {
  const r = await request.get("/assets/resume/resumes.pdf", { maxRedirects: 0 });
  expect(r.status()).toBe(301);
  expect(r.headers()["location"]).toMatch(/\/resumes\.pdf$/);
});

test("site icons follow Google's favicon guidance", async ({ request, page }) => {
  const manifest = await (await request.get("/site.webmanifest")).json();
  expect(manifest.icons.map((i: { purpose: string }) => i.purpose)).toEqual(["any", "any", "maskable"]);
  for (const f of ["/favicon.ico", "/icon-96.png", "/icon-192.png", "/icon-512.png", "/icon-maskable-512.png", "/apple-touch-icon.png"]) {
    expect((await request.get(f)).status(), f).toBe(200);
  }
  await page.goto("/");
  await expect(page.locator('link[rel="icon"][href="/favicon.ico"]')).toHaveAttribute("sizes", "48x48");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#0a0a0b");
});
