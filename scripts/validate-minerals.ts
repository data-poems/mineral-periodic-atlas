import { elements, minerals } from "../client/src/lib/mineralData";

const elementSymbols = new Set(elements.map((element) => element.symbol));
const mineralIds = new Set<string>();
const problems: string[] = [];

if (elements.length !== 118) problems.push(`Expected 118 elements, found ${elements.length}`);
if (new Set(elements.map((element) => element.number)).size !== 118) problems.push("Atomic numbers are not unique");

for (const mineral of minerals) {
  if (mineralIds.has(mineral.id)) problems.push(`Duplicate mineral id: ${mineral.id}`);
  mineralIds.add(mineral.id);
  if (!mineral.formula.trim()) problems.push(`Missing formula: ${mineral.name}`);
  for (const symbol of mineral.elements) {
    if (!elementSymbols.has(symbol)) problems.push(`Unknown symbol ${symbol} in ${mineral.name}`);
  }
  if (mineral.locality && !mineral.sourceUrl) problems.push(`Locality lacks source URL: ${mineral.name}`);
  if (mineral.image && (!mineral.imageAlt || !mineral.imageCredit || !mineral.imageSourceUrl)) {
    problems.push(`Image attribution incomplete: ${mineral.name}`);
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log(JSON.stringify({
  elements: elements.length,
  minerals: minerals.length,
  localities: minerals.filter((mineral) => mineral.locality).length,
  specimenImages: minerals.filter((mineral) => mineral.image).length,
  status: "valid",
}, null, 2));
