import { elements, minerals } from "../client/src/lib/mineralData";
import { formulaTreatsVWAsSites } from "../client/src/lib/occupancy";

const elementSymbols = new Set(elements.map((element) => element.symbol));
const mineralIds = new Set<string>();
const problems: string[] = [];

if (elements.length !== 118) problems.push(`Expected 118 elements, found ${elements.length}`);
if (new Set(elements.map((element) => element.number)).size !== 118) problems.push("Atomic numbers are not unique");

for (const mineral of minerals) {
  if (mineralIds.has(mineral.id)) problems.push(`Duplicate mineral id: ${mineral.id}`);
  mineralIds.add(mineral.id);
  if (!mineral.formula.trim()) problems.push(`Missing formula: ${mineral.name}`);
  const occupancy = [...mineral.elements, ...(mineral.substitutes ?? [])];
  for (const symbol of occupancy) {
    if (!elementSymbols.has(symbol)) problems.push(`Unknown symbol ${symbol} in ${mineral.name}`);
  }
  const required = new Set(mineral.elements);
  for (const symbol of mineral.substitutes ?? []) {
    if (required.has(symbol)) problems.push(`Substitute ${symbol} already required in ${mineral.name}`);
  }
  if (formulaTreatsVWAsSites(mineral.formula) && occupancy.includes("V")) {
    problems.push(`Site letter V treated as vanadium in ${mineral.name}`);
  }
  if (formulaTreatsVWAsSites(mineral.formula) && occupancy.includes("W")) {
    problems.push(`Site letter W treated as tungsten in ${mineral.name}`);
  }
  if (mineral.image?.includes("manus-storage") || mineral.image?.includes("__manus__")) {
    problems.push(`Manus storage path remains on ${mineral.name}`);
  }
  if (!mineral.hardness || mineral.hardness[0] < 1 || mineral.hardness[1] > 10 || mineral.hardness[0] > mineral.hardness[1]) {
    problems.push(`Invalid Mohs hardness range: ${mineral.name}`);
  }
  if (!mineral.hardnessBand || !mineral.crystalSystem || !mineral.colorGroup) {
    problems.push(`Incomplete filter traits: ${mineral.name}`);
  }
  if (mineral.locality && !mineral.sourceUrl) problems.push(`Locality lacks source URL: ${mineral.name}`);
  if (mineral.locality && !mineral.coordinates) problems.push(`Locality lacks coordinates: ${mineral.name}`);
  if (mineral.coordinates && (Math.abs(mineral.coordinates.lat) > 90 || Math.abs(mineral.coordinates.lng) > 180)) {
    problems.push(`Invalid map coordinates: ${mineral.name}`);
  }
  if (mineral.image && (!mineral.imageAlt || !mineral.imageCredit || !mineral.imageSourceUrl)) {
    problems.push(`Image attribution incomplete: ${mineral.name}`);
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

const requiredCoverage = new Set(minerals.flatMap((mineral) => mineral.elements));
console.log(JSON.stringify({
  elements: elements.length,
  minerals: minerals.length,
  requiredCoverage: requiredCoverage.size,
  localities: minerals.filter((mineral) => mineral.locality).length,
  specimenImages: minerals.filter((mineral) => mineral.image).length,
  status: "valid",
}, null, 2));
