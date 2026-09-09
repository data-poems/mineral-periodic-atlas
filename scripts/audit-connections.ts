import { elements, minerals } from "../client/src/lib/mineralData";

const rows = elements.map((element) => {
  const matches = minerals.filter((mineral) => mineral.elements.includes(element.symbol));
  const connected = new Set(matches.flatMap((mineral) => mineral.elements).filter((symbol) => symbol !== element.symbol));
  return { symbol: element.symbol, name: element.name, minerals: matches.length, connections: connected.size };
});

const covered = rows.filter((row) => row.minerals > 0);
const connected = rows.filter((row) => row.connections > 0);
console.log(JSON.stringify({
  totalMinerals: minerals.length,
  coveredElements: covered.length,
  connectedElements: connected.length,
  noMinerals: rows.filter((row) => row.minerals === 0).map((row) => row.symbol),
  singleMineral: rows.filter((row) => row.minerals === 1).map((row) => row.symbol),
}, null, 2));
