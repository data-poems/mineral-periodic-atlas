import type { ElementData } from "./mineralData";

export function searchElements(elements: ElementData[], query: string): ElementData[] {
  const value = query.trim().toLowerCase();
  if (!value) return [];
  const rank = (element: ElementData) => {
    if (element.symbol.toLowerCase() === value || String(element.number) === value) return 0;
    if (element.name.toLowerCase() === value) return 1;
    if (element.symbol.toLowerCase().startsWith(value)) return 2;
    if (element.name.toLowerCase().includes(value)) return 3;
    return 4;
  };
  return elements.filter((element) => rank(element) < 4)
    .sort((a, b) => rank(a) - rank(b) || a.number - b.number).slice(0, 6);
}
