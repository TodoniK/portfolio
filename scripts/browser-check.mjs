// Invoked with a Playwright Page by the MCP runner. No additional project dependency.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function check(page, base = "http://localhost:3100") {
  const equal = (actual, expected, message = "Browser assertion failed") => {
    if (actual !== expected) throw new Error(`${message}: ${actual} !== ${expected}`);
  };
  const sitemap = await (await page.request.get(`${base}/sitemap.xml`)).text();
  const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].replace(/^https?:\/\/[^/]+/, "") || "/");
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  for (const path of paths) {
    const response = await page.goto(base + path);
    equal(response.status(), 200, path);
    await page.locator("h1").waitFor();
    equal(await page.locator("h1").count(), 1);
    equal(await page.locator("html").getAttribute("lang"), /^\/en(?:\/|$)/.test(path) ? "en" : "fr");
  }
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/about", "/en/projects", "/expertises/cloud-devops", "/contact"]) {
      await page.goto(base + path);
      equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow ${path} at ${width}`);
    }
  }
  await page.goto(`${base}/`);
  const portrait = page.getByRole("button", { name: "Changer le portrait de Jules Royet" });
  await portrait.focus();
  await page.keyboard.press("Enter");
  equal(await portrait.getAttribute("aria-pressed"), "true");
  await page.keyboard.press("Space");
  equal(await portrait.getAttribute("aria-pressed"), "false");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await portrait.click();
  equal(await portrait.getAttribute("aria-pressed"), "true");
  equal(await page.locator(".portrait-star-top").evaluate(el => getComputedStyle(el).animationName), "none");
  await page.goto(`${base}/about`);
  equal(await page.locator(".expertise-polaroid").count(), 6);
  const credit = page.getByRole("link", { name: "Vibe codé, hébergé et maintenu par Casa Mocha" });
  equal(await credit.getAttribute("href"), "https://www.casa-mocha.fr/");
  equal(await credit.getAttribute("rel"), null);
  await page.getByRole("link", { name: "Switch to English" }).click();
  await page.waitForURL(`${base}/en/about`);
  equal(await page.locator("html").getAttribute("lang"), "en");
  const missing = await page.goto(`${base}/projects/does-not-exist`);
  equal(missing.status(), 404);
  equal(errors.length, 0, errors.join("; "));
  return { routes: paths.length, responsiveWidths: [375, 768, 1024, 1440], keyboard: "passed", reducedMotion: "passed", languageSwitch: "passed", credit: "passed", errors };
}
