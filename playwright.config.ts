import { defineConfig, devices } from "@playwright/test";

const chromiumExecutable = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    reducedMotion: "reduce",
    launchOptions: {
      args: ["--disable-gpu"],
      ...(chromiumExecutable ? { executablePath: chromiumExecutable } : {}),
    },
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm build && PORT=4173 pnpm start",
    url: "http://127.0.0.1:4173/periodic/",
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
});
