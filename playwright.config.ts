import { defineConfig, devices } from "@playwright/test";

// Tests run against the production build served by workerd (wrangler dev), the same runtime as Cloudflare.
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  workers: 4,
  reporter: [["list"]],
  use: { baseURL: process.env.BASE_URL ?? "http://127.0.0.1:8788" },
  ...(process.env.BASE_URL
    ? {}
    : { webServer: { command: "npx wrangler dev --port 8788 --ip 127.0.0.1", url: "http://127.0.0.1:8788", reuseExistingServer: true, timeout: 60_000 } }),
  projects: [
    { name: "mobile", use: { ...devices["Pixel 7"] } },
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
  ],
});
