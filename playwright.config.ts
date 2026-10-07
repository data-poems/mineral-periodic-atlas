import { defineConfig, devices } from "@playwright/test";

const chromiumExecutable = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
const liveBaseURL = process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: liveBaseURL || "http://127.0.0.1:4173",
    reducedMotion: "reduce",
    launchOptions: {
      args: ["--disable-gpu"],
      ...(process.env.PLAYWRIGHT_USE_SHM === "1" ? { ignoreDefaultArgs: ["--disable-dev-shm-usage"] } : {}),
      ...(chromiumExecutable ? { executablePath: chromiumExecutable } : {}),
    },
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: liveBaseURL ? undefined : {
    command: "pnpm exec vite build --outDir ../.verify/public && pnpm exec vite preview --outDir ../.verify/public --host 127.0.0.1 --port 4173 --strictPort",
    url: "http://127.0.0.1:4173/periodic/",
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
});
