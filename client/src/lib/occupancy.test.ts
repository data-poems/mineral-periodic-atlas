import { describe, expect, it } from "vitest";
import { minerals } from "./mineralData";
import {
  connectionSymbols,
  distinctiveElement,
  formulaTreatsVWAsSites,
  listsMineralForElement,
  occupancySymbols,
} from "./occupancy";

const byId = (id: string) => {
  const mineral = minerals.find((item) => item.id === id);
  if (!mineral) throw new Error(`Missing mineral ${id}`);
  return mineral;
};

describe("formula site letters", () => {
  it("treats Hawthorne–Henry V₃W as anion sites, not vanadium/tungsten", () => {
    expect(formulaTreatsVWAsSites("XY₃Z₆(T₆O₁₈)(BO₃)₃V₃W")).toBe(true);
    expect(formulaTreatsVWAsSites("NaAlSi₂O₆")).toBe(false);
  });
});

describe("tourmaline occupancy", () => {
  it("does not list V or W as chemical elements", () => {
    const tourmaline = byId("tourmaline");
    expect(tourmaline.elements).not.toContain("V");
    expect(tourmaline.elements).not.toContain("W");
    expect(tourmaline.substitutes ?? []).not.toContain("V");
    expect(tourmaline.substitutes ?? []).not.toContain("W");
  });

  it("keeps boron in required occupancy", () => {
    expect(byId("tourmaline").elements).toContain("B");
  });
});

describe("group unions", () => {
  it.each([
    ["olivine", ["Mg", "Fe"], "Si"],
    ["topaz", ["F", "H"], "Al"],
    ["monazite", ["Ce", "Nd"], "P"],
    ["wolframite", ["Fe", "Mn"], "W"],
    ["pollucite", ["Na", "H"], "Cs"],
    ["tourmaline", ["Al", "Cr"], "B"],
  ] as const)("keeps variable occupants out of unfocused %s links", (id, variable, framework) => {
    const mineral = byId(id);
    for (const symbol of variable) {
      expect(listsMineralForElement(mineral, symbol)).toBe("substitute");
      expect(connectionSymbols([mineral], framework, null).has(symbol)).toBe(false);
      expect(connectionSymbols([mineral], framework, id).has(symbol)).toBe(true);
      expect(connectionSymbols([mineral], symbol, null).size).toBe(0);
    }
  });

  it("retains hydroxyl hydrogen and the named allanite endmember", () => {
    expect(listsMineralForElement(byId("kaolinite"), "H")).toBe("required");
    expect(byId("allanite").name).toBe("Allanite-(Ce)");
    expect(listsMineralForElement(byId("allanite"), "Ce")).toBe("required");
    expect(byId("rubicline").recordKind).toBe("species");
  });
  it("keeps apatite halogen/hydroxyl occupancy optional", () => {
    const apatite = byId("apatite");
    expect(apatite.elements).toEqual(["Ca", "P", "O"]);
    expect(apatite.substitutes).toEqual(expect.arrayContaining(["F", "Cl", "H"]));
  });

  it("keeps garnet cations optional", () => {
    const garnet = byId("garnet");
    expect(garnet.elements).toEqual(["Si", "O"]);
    expect(garnet.substitutes).toEqual(expect.arrayContaining(["Fe", "Mg", "Ca", "Mn", "Al", "Cr"]));
  });
});

describe("occupancySymbols", () => {
  it("uses required elements until a mineral is focused", () => {
    const garnet = byId("garnet");
    expect(occupancySymbols(garnet, false)).toEqual(["Si", "O"]);
    expect(occupancySymbols(garnet, true)).toEqual(expect.arrayContaining(["Si", "O", "Fe", "Al"]));
  });
});

describe("listsMineralForElement", () => {
  it("labels Fe in garnet as substitutional", () => {
    expect(listsMineralForElement(byId("garnet"), "Fe")).toBe("substitute");
    expect(listsMineralForElement(byId("garnet"), "Si")).toBe("required");
    expect(listsMineralForElement(byId("garnet"), "N")).toBeNull();
  });
});

describe("connectionSymbols", () => {
  it("does not draw vanadium through unfocused tourmaline", () => {
    const linked = connectionSymbols(minerals, "V", null);
    expect(linked.has("B")).toBe(false);
  });

  it("draws substitution chemistry only when that mineral is focused", () => {
    const unfocused = connectionSymbols([byId("garnet")], "Si", null);
    expect(unfocused.has("Fe")).toBe(false);
    const focused = connectionSymbols([byId("garnet")], "Si", "garnet");
    expect(focused.has("Fe")).toBe(true);
  });
});

describe("distinctiveElement", () => {
  it("prefers the pinned cation when it is required", () => {
    expect(distinctiveElement(byId("kaolinite"), "Si")).toBe("Si");
  });

  it("skips oxygen when choosing a default camera element", () => {
    expect(distinctiveElement(byId("kaolinite"))).toBe("Al");
  });
});
