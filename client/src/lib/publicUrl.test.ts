import { describe, expect, it } from "vitest";
import { publicUrl } from "./publicUrl";

describe("publicUrl", () => {
  it("prefixes the Vite base path", () => {
    expect(publicUrl("/specimens/quartz.jpg", "/periodic/")).toBe("/periodic/specimens/quartz.jpg");
  });

  it("keeps root-relative paths at site root", () => {
    expect(publicUrl("/specimens/quartz.jpg", "/")).toBe("/specimens/quartz.jpg");
  });
});
