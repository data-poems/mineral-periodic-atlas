import { expect, test, type Page } from "@playwright/test";

const elementCell = (page: Page, name: string, symbol: string) =>
  page.getByRole("button", { name: new RegExp(`^${name}, ${symbol},`) });

const queryValue = (page: Page, key: string) => new URL(page.url()).searchParams.get(key);

test.beforeEach(async ({ page }) => {
  await page.route(/https:\/\/(stats\.dr\.eamer\.dev|fonts\.googleapis\.com|fonts\.gstatic\.com)\//, (route) => route.abort());
});

test("restores a fully specified shared atlas link", async ({ page }) => {
  await page.goto("/periodic/?element=Pt&mineral=sperrylite&compare=Pt-As&family=sulfide&crystal=cubic&filters=1");

  await expect(page.getByRole("region", { name: "Compare Platinum and Arsenic" })).toBeVisible();
  await expect(elementCell(page, "Platinum", "Pt")).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: "Filters" })).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByLabel("Crystal system")).toHaveValue("cubic");
  await expect(page.getByRole("button", { name: "Sulfides", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".mineral-card.active").filter({ hasText: "Sperrylite" })).toBeVisible();
});

test("browses fact-checked oxysalt records from a shareable filter", async ({ page }) => {
  await page.goto("/periodic/?element=W&family=oxysalt");

  await expect(page.getByRole("button", { name: "Oxysalts (Mo/W/Nb/Ta)", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".mineral-card")).toHaveCount(2);
  await expect(page.locator(".mineral-card").filter({ hasText: "Scheelite" })).toBeVisible();
  await expect(page.locator(".mineral-card").filter({ hasText: "Wolframite series" })).toBeVisible();
});

test("search, comparison, filters, and reset update the complete exploration state", async ({ page }) => {

  const search = page.getByLabel("Find an element by name, symbol, or atomic number");
  await page.goto("/periodic/");
  await search.fill("78");
  await search.press("Enter");
  await expect(elementCell(page, "Platinum", "Pt")).toHaveAttribute("aria-pressed", "true");
  await expect.poll(() => queryValue(page, "element")).toBe("Pt");

  await page.getByRole("button", { name: "Compare" }).click();
  await elementCell(page, "Arsenic", "As").click();
  await expect(page.getByRole("region", { name: "Compare Platinum and Arsenic" })).toBeVisible();
  await expect.poll(() => queryValue(page, "compare")).toBe("Pt-As");

  await page.getByRole("button", { name: "Filters" }).click();
  await page.getByLabel("Crystal system").selectOption("cubic");
  await expect(page.getByLabel("Crystal system")).toHaveValue("cubic");

  await page.getByRole("button", { name: "Reset exploration" }).click();
  await expect(elementCell(page, "Silicon", "Si")).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("region", { name: /Compare/ })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Filters" })).toHaveAttribute("aria-expanded", "false");
  await expect(search).toHaveValue("");
  await expect.poll(() => new URL(page.url()).search).toBe("");
});

test("keyboard selection uses the native periodic-table button", async ({ page }) => {
  await page.goto("/periodic/");

  const oxygen = elementCell(page, "Oxygen", "O");
  await oxygen.focus();
  await page.keyboard.press("Enter");

  await expect(oxygen).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("heading", { name: "Oxygen" })).toBeVisible();
  await expect.poll(() => queryValue(page, "element")).toBe("O");
});

test("synchronizes map markers, locality rows, and mineral cards", async ({ page }) => {
  await page.goto("/periodic/");

  const jadeiteMarker = page.getByRole("button", { name: "Jadeite, Hpakan region" });
  await jadeiteMarker.click();
  await expect(jadeiteMarker).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".locality-index [data-mineral-id=jadeite]")).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".mineral-card.active").filter({ hasText: "Jadeite" })).toBeVisible();

  await elementCell(page, "Oxygen", "O").click();
  await page.locator(".mineral-card").filter({ hasText: "Jadeite" }).click();
  await expect(page.getByRole("button", { name: "Jadeite, Hpakan region" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".locality-index [data-mineral-id=jadeite]")).toHaveAttribute("aria-pressed", "true");
});

test("Back and Forward restore URL-backed atlas state", async ({ page }) => {
  await page.goto("/periodic/");

  await elementCell(page, "Platinum", "Pt").click();
  await expect.poll(() => queryValue(page, "element")).toBe("Pt");
  await page.getByRole("button", { name: "Sulfides", exact: true }).click();
  await expect.poll(() => queryValue(page, "family")).toBe("sulfide");

  await page.goBack();
  await expect(elementCell(page, "Platinum", "Pt")).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: "Sulfides", exact: true })).toHaveAttribute("aria-pressed", "false");
  await expect.poll(() => queryValue(page, "family")).toBeNull();

  await page.goBack();
  await expect(elementCell(page, "Silicon", "Si")).toHaveAttribute("aria-pressed", "true");
  await expect.poll(() => new URL(page.url()).search).toBe("");

  await page.goForward();
  await expect(elementCell(page, "Platinum", "Pt")).toHaveAttribute("aria-pressed", "true");
  await expect.poll(() => queryValue(page, "element")).toBe("Pt");
});

test("normalizes an invalid shared link without adding a history entry", async ({ page }) => {
  await page.goto("/periodic/?element=Xx&family=unlisted");

  await expect(elementCell(page, "Silicon", "Si")).toHaveAttribute("aria-pressed", "true");
  await expect.poll(() => new URL(page.url()).search).toBe("");
});
