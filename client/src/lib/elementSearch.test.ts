import { describe, expect, it } from "vitest";
import { elements } from "./mineralData";
import { searchElements } from "./elementSearch";

describe("element search", () => {
  it("puts exact Pt ahead of Krypton and Neptunium", () => {
    expect(searchElements(elements, " Pt ").map((e) => e.symbol)).toEqual(["Pt", "Kr", "Np"]);
  });
  it("finds exact atomic numbers and names", () => {
    expect(searchElements(elements, "78")[0].symbol).toBe("Pt");
    expect(searchElements(elements, "platinum")[0].symbol).toBe("Pt");
    expect(searchElements(elements, "C")[0].symbol).toBe("C");
  });
  it("leaves empty and unknown searches empty", () => {
    expect(searchElements(elements, "  ")).toEqual([]);
    expect(searchElements(elements, "not-an-element")).toEqual([]);
  });
});
