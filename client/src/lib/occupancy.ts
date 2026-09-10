import type { MineralData, MineralFamily } from "./mineralData";

export function formulaTreatsVWAsSites(formula: string): boolean {
  return /V[₃3]W/.test(formula);
}

export function occupancySymbols(mineral: MineralData, focused: boolean): string[] {
  if (!focused) return mineral.elements;
  const seen = new Set(mineral.elements);
  const merged = [...mineral.elements];
  for (const symbol of mineral.substitutes ?? []) {
    if (seen.has(symbol)) continue;
    seen.add(symbol);
    merged.push(symbol);
  }
  return merged;
}

export function listsMineralForElement(
  mineral: MineralData,
  symbol: string,
): "required" | "substitute" | null {
  if (mineral.elements.includes(symbol)) return "required";
  if (mineral.substitutes?.includes(symbol)) return "substitute";
  return null;
}

export function distinctiveElement(mineral: MineralData, preferred?: string | null): string {
  if (preferred && mineral.elements.includes(preferred)) return preferred;
  const cations = mineral.elements.filter((symbol) => symbol !== "O" && symbol !== "H");
  return cations[0] ?? mineral.elements[0] ?? "Si";
}

export function connectionSymbols(
  source: MineralData[],
  activeSymbol: string,
  focusedId: string | null,
): Map<string, { family: MineralFamily; count: number }> {
  const bySymbol = new Map<string, { family: MineralFamily; count: number }>();
  for (const mineral of source) {
    const listed = listsMineralForElement(mineral, activeSymbol);
    if (!listed) continue;
    const focused = focusedId === mineral.id;
    if (!focused && listed === "substitute") continue;
    for (const symbol of occupancySymbols(mineral, focused)) {
      if (symbol === activeSymbol) continue;
      const current = bySymbol.get(symbol);
      bySymbol.set(symbol, {
        family: current?.family ?? mineral.family,
        count: (current?.count ?? 0) + 1,
      });
    }
  }
  return bySymbol;
}
