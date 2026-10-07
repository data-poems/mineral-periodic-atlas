import { describe, expect, it } from "vitest";
import { familyMeta, minerals } from "./mineralData";

describe("mineral family taxonomy", () => {
  it("keeps the reviewed oxysalt navigation records and their sources", () => {
    const oxysalts = minerals.filter((mineral) => mineral.family === "oxysalt");

    expect(oxysalts.map((mineral) => mineral.id)).toEqual([
      "scheelite",
      "columbite",
      "powellite",
      "wolframite",
      "tantalite",
    ]);
    expect(familyMeta.oxysalt.label).toBe("Oxysalts");
    expect(oxysalts.every((mineral) => mineral.sourceUrl)).toBe(true);
  });

  it("represents wolframite as a series between its two endmembers", () => {
    const wolframite = minerals.find((mineral) => mineral.id === "wolframite");

    expect(wolframite).toMatchObject({
      name: "Wolframite series",
      recordKind: "series",
      substitutes: ["Fe", "Mn"],
    });
  });
});
