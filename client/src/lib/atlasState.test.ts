import { describe, expect, it } from "vitest";
import { parseAtlasQuery, serializeAtlasQuery, type AtlasQuery } from "./atlasState";

const valid = {
  elements: new Set(["Si", "O", "Pt", "As", "N"]),
  minerals: new Set(["sperrylite", "nitratine", "quartz"]),
};

const sample: AtlasQuery = {
  element: "Pt",
  mineral: "sperrylite",
  compare: ["Pt", "As"],
  family: "sulfide",
  hardness: "all",
  crystal: "cubic",
  color: "all",
  filtersOpen: true,
};

describe("atlas query state", () => {
  it("round-trips element, mineral, compare pair, and filters", () => {
    const search = serializeAtlasQuery(sample);
    expect(search).toContain("element=Pt");
    expect(search).toContain("mineral=sperrylite");
    expect(search).toContain("compare=Pt-As");
    expect(parseAtlasQuery(search, valid)).toEqual(sample);
  });

  it("omits default silicon with no extras", () => {
    expect(
      serializeAtlasQuery({
        element: "Si",
        mineral: null,
        compare: null,
        family: "all",
        hardness: "all",
        crystal: "all",
        color: "all",
        filtersOpen: false,
      }),
    ).toBe("");
  });

  it("ignores unknown element and mineral ids", () => {
    const parsed = parseAtlasQuery("?element=Xx&mineral=unobtainium&compare=Si,O", valid);
    expect(parsed.element).toBe("Si");
    expect(parsed.mineral).toBeNull();
    expect(parsed.compare).toEqual(["Si", "O"]);
  });
});
