export type AtlasQuery = {
  element: string;
  mineral: string | null;
  compare: [string, string] | null;
  family: string;
  hardness: string;
  crystal: string;
  color: string;
  filtersOpen: boolean;
};

export const defaultAtlasQuery: AtlasQuery = {
  element: "Si",
  mineral: null,
  compare: null,
  family: "all",
  hardness: "all",
  crystal: "all",
  color: "all",
  filtersOpen: false,
};

type AtlasValidity = {
  elements: Set<string>;
  minerals: Set<string>;
};

const pick = (value: string | null, allowed: Set<string> | null, fallback: string) => {
  if (!value) return fallback;
  if (allowed && !allowed.has(value)) return fallback;
  return value;
};

export function parseAtlasQuery(search: string, valid: AtlasValidity): AtlasQuery {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const compareRaw = params.get("compare");
  let compare: [string, string] | null = null;
  if (compareRaw && compareRaw !== "1") {
    const [left, right] = compareRaw.split(/[-,]/);
    if (left && right && valid.elements.has(left) && valid.elements.has(right)) {
      compare = [left, right];
    }
  } else if (compareRaw === "1") {
    compare = ["Si", "O"];
  }

  const mineralRaw = params.get("mineral");
  return {
    element: pick(params.get("element"), valid.elements, defaultAtlasQuery.element),
    mineral: mineralRaw && valid.minerals.has(mineralRaw) ? mineralRaw : null,
    compare,
    family: pick(params.get("family"), null, defaultAtlasQuery.family),
    hardness: pick(params.get("hardness"), null, defaultAtlasQuery.hardness),
    crystal: pick(params.get("crystal"), null, defaultAtlasQuery.crystal),
    color: pick(params.get("color"), null, defaultAtlasQuery.color),
    filtersOpen: params.get("filters") === "1",
  };
}

export function serializeAtlasQuery(state: AtlasQuery): string {
  const params = new URLSearchParams();
  if (state.element !== defaultAtlasQuery.element) params.set("element", state.element);
  if (state.mineral) params.set("mineral", state.mineral);
  if (state.compare) params.set("compare", `${state.compare[0]}-${state.compare[1]}`);
  if (state.family !== defaultAtlasQuery.family) params.set("family", state.family);
  if (state.hardness !== defaultAtlasQuery.hardness) params.set("hardness", state.hardness);
  if (state.crystal !== defaultAtlasQuery.crystal) params.set("crystal", state.crystal);
  if (state.color !== defaultAtlasQuery.color) params.set("color", state.color);
  if (state.filtersOpen) params.set("filters", "1");
  const encoded = params.toString();
  return encoded ? `?${encoded}` : "";
}
