import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronRight,
  GitCompareArrows,
  Info,
  MapPin,
  Maximize2,
  Minimize2,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import LocalityMap from "@/components/LocalityMap";
import { parseAtlasQuery, serializeAtlasQuery } from "@/lib/atlasState";
import {
  elements,
  familyMeta,
  minerals,
  type ColorGroup,
  type CrystalSystem,
  type HardnessBand,
  type MineralData,
  type MineralFamily,
} from "@/lib/mineralData";
import { connectionSymbols, distinctiveElement, listsMineralForElement } from "@/lib/occupancy";
import { publicUrl } from "@/lib/publicUrl";

const filters: Array<{ id: "all" | MineralFamily; label: string }> = [
  { id: "all", label: "All families" },
  { id: "silicate", label: "Silicates" },
  { id: "carbonate", label: "Carbonates" },
  { id: "sulfide", label: "Sulfides" },
  { id: "oxide", label: "Oxides" },
  { id: "halide", label: "Halides" },
  { id: "sulfate", label: "Sulfates" },
  { id: "nitrate", label: "Nitrates" },
  { id: "phosphate", label: "Phosphates" },
  { id: "native", label: "Native" },
];

const kindLabels = {
  metal: "Metal",
  metalloid: "Metalloid",
  nonmetal: "Nonmetal",
  lanthanide: "Lanthanide",
  actinide: "Actinide",
};

const familyColor = (family: MineralFamily) => familyMeta[family].color;

const hardnessOptions: Array<{ id: "all" | HardnessBand; label: string; detail: string }> = [
  { id: "all", label: "Any hardness", detail: "Mohs 1–10" },
  { id: "soft", label: "Soft", detail: "≤ 2.5" },
  { id: "moderate", label: "Moderate", detail: "3–5" },
  { id: "hard", label: "Hard", detail: "5.5–7" },
  { id: "very-hard", label: "Very hard", detail: "7.5–10" },
];
const crystalOptions: Array<"all" | CrystalSystem> = ["all", "cubic", "tetragonal", "orthorhombic", "hexagonal", "trigonal", "monoclinic", "triclinic"];
const colorOptions: Array<"all" | ColorGroup> = ["all", "light", "green", "blue", "warm", "dark", "metallic", "multicolor"];
const titleCase = (value: string) => value === "all" ? "Any" : value.replace("-", " ").replace(/^./, (letter) => letter.toUpperCase());
const hardnessLabel = ([minimum, maximum]: [number, number]) => minimum === maximum ? `${minimum}` : `${minimum}–${maximum}`;
const atlasValidity = {
  elements: new Set(elements.map((element) => element.symbol)),
  minerals: new Set(minerals.map((mineral) => mineral.id)),
};
const initialQuery = parseAtlasQuery(window.location.search, atlasValidity);
const initialChoice = <T extends string>(value: string, choices: readonly T[], fallback: T): T =>
  choices.includes(value as T) ? (value as T) : fallback;

export default function Home() {
  const [pinnedSymbol, setPinnedSymbol] = useState(initialQuery.element);
  const [hoveredSymbol, setHoveredSymbol] = useState<string | null>(null);
  const [family, setFamily] = useState<"all" | MineralFamily>(() => initialChoice(initialQuery.family, filters.map((item) => item.id), "all"));
  const [query, setQuery] = useState("");
  const [hoveredMineral, setHoveredMineral] = useState<string | null>(null);
  const [pinnedMineral, setPinnedMineral] = useState<string | null>(initialQuery.mineral);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [uiError, setUiError] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(() => initialQuery.compare !== null);
  const [compareSymbols, setCompareSymbols] = useState<[string, string]>(initialQuery.compare ?? ["Si", "O"]);
  const [compareSlot, setCompareSlot] = useState<0 | 1>(1);
  const [advancedOpen, setAdvancedOpen] = useState(initialQuery.filtersOpen);
  const [hardnessFilter, setHardnessFilter] = useState<"all" | HardnessBand>(() => initialChoice(initialQuery.hardness, hardnessOptions.map((option) => option.id), "all"));
  const [crystalFilter, setCrystalFilter] = useState<"all" | CrystalSystem>(() => initialChoice(initialQuery.crystal, crystalOptions, "all"));
  const [colorFilter, setColorFilter] = useState<"all" | ColorGroup>(() => initialChoice(initialQuery.color, colorOptions, "all"));
  const [lineGeometry, setLineGeometry] = useState<Array<{ symbol: string; x1: number; y1: number; x2: number; y2: number; family: MineralFamily; weight: number }>>([]);

  const appRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const elementRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeSymbol = hoveredSymbol ?? pinnedSymbol;
  const activeElement = elements.find((item) => item.symbol === activeSymbol) ?? elements[13];
  const activeMineralId = hoveredMineral ?? pinnedMineral;
  const compareA = elements.find((item) => item.symbol === compareSymbols[0]) ?? elements[13];
  const compareB = elements.find((item) => item.symbol === compareSymbols[1]) ?? elements[7];

  const filteredMinerals = useMemo(
    () => minerals.filter((mineral) =>
      (family === "all" || mineral.family === family) &&
      (hardnessFilter === "all" || mineral.hardnessBand === hardnessFilter) &&
      (crystalFilter === "all" || mineral.crystalSystem === crystalFilter) &&
      (colorFilter === "all" || mineral.colorGroup === colorFilter),
    ),
    [family, hardnessFilter, crystalFilter, colorFilter],
  );

  const activeAdvancedFilters = [hardnessFilter, crystalFilter, colorFilter].filter((value) => value !== "all").length;
  const elementCoverage = useMemo(
    () => elements.filter((element) => minerals.some((mineral) => mineral.elements.includes(element.symbol))).length,
    [],
  );
  const filteredLocalities = useMemo(
    () => filteredMinerals.filter((mineral) => mineral.coordinates && mineral.locality),
    [filteredMinerals],
  );

  const elementMinerals = useMemo(
    () => filteredMinerals.filter((mineral) => listsMineralForElement(mineral, activeSymbol)),
    [activeSymbol, filteredMinerals],
  );

  const mineralCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const mineral of filteredMinerals) {
      for (const symbol of mineral.elements) {
        counts.set(symbol, (counts.get(symbol) ?? 0) + 1);
      }
    }
    return counts;
  }, [filteredMinerals]);

  const comparison = useMemo(() => {
    const left = filteredMinerals.filter((mineral) => mineral.elements.includes(compareSymbols[0]));
    const right = filteredMinerals.filter((mineral) => mineral.elements.includes(compareSymbols[1]));
    const shared = left.filter((mineral) => mineral.elements.includes(compareSymbols[1]));
    const leftOnly = left.filter((mineral) => !mineral.elements.includes(compareSymbols[1]));
    const rightOnly = right.filter((mineral) => !mineral.elements.includes(compareSymbols[0]));
    return { left, right, shared, leftOnly, rightOnly };
  }, [compareSymbols, filteredMinerals]);

  const visibleMinerals = useMemo(() => {
    if (!activeMineralId) return elementMinerals;
    const focused = elementMinerals.find((mineral) => mineral.id === activeMineralId);
    return focused ? [focused] : elementMinerals;
  }, [activeMineralId, elementMinerals]);

  const connections = useMemo(
    () => connectionSymbols(visibleMinerals, activeSymbol, activeMineralId),
    [activeMineralId, activeSymbol, visibleMinerals],
  );

  const dataIssues = useMemo(() => {
    const symbols = new Set(elements.map((item) => item.symbol));
    return minerals.flatMap((mineral) =>
      mineral.elements
        .filter((symbol) => !symbols.has(symbol))
        .map((symbol) => `${mineral.name} references unknown element ${symbol}`),
    );
  }, []);

  const searchMatches = useMemo(() => {
    const cleaned = query.trim().toLowerCase();
    if (!cleaned) return [];
    return elements
      .filter(
        (item) =>
          item.name.toLowerCase().includes(cleaned) ||
          item.symbol.toLowerCase().startsWith(cleaned) ||
          String(item.number) === cleaned,
      )
      .slice(0, 6);
  }, [query]);

  const chooseElement = (symbol: string) => {
    if (compareMode) {
      setCompareSymbols((current) => {
        const next: [string, string] = [...current];
        next[compareSlot] = symbol;
        return next;
      });
      setCompareSlot((current) => current === 0 ? 1 : 0);
    }
    setPinnedSymbol(symbol);
    setHoveredSymbol(null);
    setPinnedMineral(null);
    setHoveredMineral(null);
    setQuery("");
    setUiError(null);
  };

  const toggleCompareMode = () => {
    setCompareMode((current) => {
      const next = !current;
      if (next) {
        setCompareSymbols([pinnedSymbol, pinnedSymbol === "O" ? "Si" : "O"]);
        setCompareSlot(1);
      }
      return next;
    });
  };

  const clearAdvancedFilters = () => {
    setHardnessFilter("all");
    setCrystalFilter("all");
    setColorFilter("all");
    setPinnedMineral(null);
    setHoveredMineral(null);
  };

  const handleMapSelect = useCallback((mineral: MineralData) => {
    setPinnedSymbol((current) => distinctiveElement(mineral, current));
    setPinnedMineral(mineral.id);
    setHoveredMineral(null);
    setUiError(null);
  }, []);

  const handleMapHover = useCallback((id: string | null) => {
    setHoveredMineral(id);
  }, []);

  useLayoutEffect(() => {
    const updateLines = () => {
      const grid = gridRef.current;
      const source = elementRefs.current[activeSymbol];
      if (!grid || !source) return;
      const gridBox = grid.getBoundingClientRect();
      const sourceBox = source.getBoundingClientRect();
      const x1 = sourceBox.left - gridBox.left + sourceBox.width / 2;
      const y1 = sourceBox.top - gridBox.top + sourceBox.height / 2;
      const next = Array.from(connections.entries()).flatMap(([symbol, meta]) => {
        const target = elementRefs.current[symbol];
        if (!target) return [];
        const targetBox = target.getBoundingClientRect();
        return [{
          symbol,
          x1,
          y1,
          x2: targetBox.left - gridBox.left + targetBox.width / 2,
          y2: targetBox.top - gridBox.top + targetBox.height / 2,
          family: meta.family,
          weight: meta.count,
        }];
      });
      setLineGeometry(next);
    };

    const frame = requestAnimationFrame(updateLines);
    const observer = new ResizeObserver(updateLines);
    if (gridRef.current) observer.observe(gridRef.current);
    window.addEventListener("resize", updateLines);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", updateLines);
    };
  }, [activeSymbol, connections]);

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(document.fullscreenElement === appRef.current);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    const next = serializeAtlasQuery({
      element: pinnedSymbol,
      mineral: pinnedMineral,
      compare: compareMode ? compareSymbols : null,
      family,
      hardness: hardnessFilter,
      crystal: crystalFilter,
      color: colorFilter,
      filtersOpen: advancedOpen,
    });
    const url = `${window.location.pathname}${next}${window.location.hash}`;
    if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== url) {
      window.history.replaceState(null, "", url);
    }
  }, [advancedOpen, colorFilter, compareMode, compareSymbols, crystalFilter, family, hardnessFilter, pinnedMineral, pinnedSymbol]);

  const toggleFullscreen = async () => {
    setUiError(null);
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (appRef.current?.requestFullscreen) {
        await appRef.current.requestFullscreen();
      } else {
        setUiError("Full-screen mode is not supported by this browser.");
      }
    } catch {
      setUiError("Full-screen mode was blocked. Try again after interacting with the page.");
    }
  };

  const linePath = (line: (typeof lineGeometry)[number], index: number) => {
    const dx = line.x2 - line.x1;
    const dy = line.y2 - line.y1;
    const length = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
    const bend = Math.min(24, length * 0.08) * (index % 2 === 0 ? 1 : -1);
    const cx = (line.x1 + line.x2) / 2 - (dy / length) * bend;
    const cy = (line.y1 + line.y2) / 2 + (dx / length) * bend;
    return `M ${line.x1} ${line.y1} Q ${cx} ${cy} ${line.x2} ${line.y2}`;
  };

  const hasRelationships = connections.size > 0;

  return (
    <main className="atlas-app" ref={appRef}>
      <header className="topbar">
        <div className="app-identity">
          <h1>Mineral connections</h1>
          <span>Hover element · click to pin</span>
        </div>
        <div className="topbar-meta" aria-label="Dataset summary">
          <span><b>{elements.length}</b> elements</span>
          <span><b>{elementCoverage}</b> represented</span>
          <span><b>{minerals.length}</b> minerals</span>
        </div>
        <button className="icon-button" onClick={toggleFullscreen} aria-label={isFullscreen ? "Exit full screen" : "View full screen"}>
          {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          <span>{isFullscreen ? "Exit" : "Full screen"}</span>
        </button>
      </header>

      <section className="explorer" aria-label="Mineral relationship explorer">
        <div className="controls-row">
          <div className="search-wrap">
            <Search size={16} aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && searchMatches[0]) chooseElement(searchMatches[0].symbol);
                if (event.key === "Escape") setQuery("");
              }}
              placeholder="Find an element…"
              aria-label="Find an element by name, symbol, or atomic number"
            />
            {query && (
              <div className="search-results" role="listbox">
                {searchMatches.length ? searchMatches.map((item) => (
                  <button key={item.symbol} onClick={() => chooseElement(item.symbol)} role="option">
                    <span className="search-symbol">{item.symbol}</span>
                    <span>{item.name}</span>
                    <small>{item.number}</small>
                  </button>
                )) : <div className="search-empty">No element matches “{query}”</div>}
              </div>
            )}
          </div>

          <button
            className={compareMode ? "compare-toggle active" : "compare-toggle"}
            onClick={toggleCompareMode}
            aria-pressed={compareMode}
          >
            <GitCompareArrows size={14} /> Compare
          </button>

          <button
            className={advancedOpen || activeAdvancedFilters ? "advanced-toggle active" : "advanced-toggle"}
            onClick={() => setAdvancedOpen((current) => !current)}
            aria-expanded={advancedOpen}
            aria-controls="advanced-filters"
          >
            <SlidersHorizontal size={14} /> Filters
            {activeAdvancedFilters > 0 && <b>{activeAdvancedFilters}</b>}
          </button>

          <div className="filter-scroll" aria-label="Filter by mineral family">
            {filters.map((item) => (
              <button
                key={item.id}
                className={family === item.id ? "filter-chip active" : "filter-chip"}
                onClick={() => {
                  setFamily(item.id);
                  setPinnedMineral(null);
                  setHoveredMineral(null);
                }}
                aria-pressed={family === item.id}
              >
                {item.id !== "all" && <span style={{ background: familyColor(item.id) }} />}
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {advancedOpen && (
          <section className="advanced-filters" id="advanced-filters" aria-label="Advanced mineral filters">
            <div className="filter-intro">
              <span className="caption-index">FILTER</span>
              <div><strong>Mineral properties</strong><small>Typical values</small></div>
            </div>
            <label>
              <span>Mohs hardness</span>
              <select value={hardnessFilter} onChange={(event) => { setHardnessFilter(event.target.value as "all" | HardnessBand); setPinnedMineral(null); }}>
                {hardnessOptions.map((option) => <option key={option.id} value={option.id}>{option.label} · {option.detail}</option>)}
              </select>
            </label>
            <label>
              <span>Crystal system</span>
              <select value={crystalFilter} onChange={(event) => { setCrystalFilter(event.target.value as "all" | CrystalSystem); setPinnedMineral(null); }}>
                {crystalOptions.map((option) => <option key={option} value={option}>{titleCase(option)}</option>)}
              </select>
            </label>
            <label>
              <span>Typical color</span>
              <select value={colorFilter} onChange={(event) => { setColorFilter(event.target.value as "all" | ColorGroup); setPinnedMineral(null); }}>
                {colorOptions.map((option) => <option key={option} value={option}>{titleCase(option)}</option>)}
              </select>
            </label>
            <div className="filter-result" aria-live="polite"><b>{filteredMinerals.length}</b><span>minerals</span><i /> <b>{filteredLocalities.length}</b><span>mapped</span></div>
            <button className="clear-filters" onClick={clearAdvancedFilters} disabled={!activeAdvancedFilters}><RotateCcw size={12} /> Clear</button>
          </section>
        )}

        {(uiError || dataIssues.length > 0) && (
          <div className="error-banner" role="alert">
            <Info size={15} /> {uiError ?? `Dataset check found ${dataIssues.length} invalid reference${dataIssues.length === 1 ? "" : "s"}.`}
          </div>
        )}

        {compareMode && (
          <section className="compare-workspace" aria-label={`Compare ${compareA.name} and ${compareB.name}`}>
            <div className="compare-title">
              <div><span className="caption-index">COMPARE</span><strong>Element overlap</strong></div>
              <p>Choose a slot, then select any element from the table.</p>
              <button onClick={() => setCompareMode(false)} aria-label="Close comparison"><X size={15} /></button>
            </div>
            <div className="compare-elements">
              <button className={compareSlot === 0 ? "compare-element active" : "compare-element"} onClick={() => setCompareSlot(0)}>
                <span>A</span><strong>{compareA.symbol}</strong><div><b>{compareA.name}</b><small>{comparison.left.length} minerals</small></div>
              </button>
              <div className="compare-junction"><GitCompareArrows size={16} /><span>{comparison.shared.length}</span><small>shared</small></div>
              <button className={compareSlot === 1 ? "compare-element active" : "compare-element"} onClick={() => setCompareSlot(1)}>
                <span>B</span><strong>{compareB.symbol}</strong><div><b>{compareB.name}</b><small>{comparison.right.length} minerals</small></div>
              </button>
            </div>
            <div className="compare-results">
              <div><span>Only {compareA.symbol}</span><b>{comparison.leftOnly.length}</b></div>
              <div className="shared-minerals">
                <span>Shared minerals</span>
                <div>{comparison.shared.length ? comparison.shared.slice(0, 5).map((mineral) => <button key={mineral.id} onClick={() => { setPinnedSymbol(compareA.symbol); setPinnedMineral(mineral.id); }}>{mineral.name}</button>) : <em>No shared mineral in this family filter</em>}</div>
              </div>
              <div><span>Only {compareB.symbol}</span><b>{comparison.rightOnly.length}</b></div>
            </div>
          </section>
        )}

        <div className="viz-layout">
          <section className="table-panel" aria-label="Interactive periodic table">
            <div className="panel-caption">
              <div><span className="caption-index">01</span><span>ELEMENT FIELD</span></div>
              <div className="live-summary" aria-live="polite">
                {hasRelationships ? `${connections.size} linked element${connections.size === 1 ? "" : "s"}` : "No linked elements in this view"}
              </div>
            </div>

            <div className="table-scroll">
              <div className="periodic-grid" ref={gridRef}>
                <div className="series-label lanthanide-label">LANTHANIDES</div>
                <div className="series-label actinide-label">ACTINIDES</div>
                <div className="series-placeholder lanthanide-placeholder"><span>57–71</span></div>
                <div className="series-placeholder actinide-placeholder"><span>89–103</span></div>

                <svg className="connections" aria-hidden="true">
                  <defs>
                    <filter id="lineGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="2.4" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                  {lineGeometry.map((line, index) => (
                    <g key={`${activeSymbol}-${line.symbol}`}>
                      <path
                        d={linePath(line, index)}
                        stroke={familyColor(line.family)}
                        strokeWidth={1.2 + Math.min(line.weight, 4) * 0.45}
                        className="connection-path"
                        filter="url(#lineGlow)"
                      />
                      <circle cx={line.x2} cy={line.y2} r="3" fill={familyColor(line.family)} className="endpoint" />
                    </g>
                  ))}
                </svg>

                {elements.map((item) => {
                  const isActive = item.symbol === activeSymbol;
                  const isConnected = connections.has(item.symbol);
                  const isDimmed = hasRelationships && !isActive && !isConnected;
                  const compareIndex = compareMode ? compareSymbols.indexOf(item.symbol) : -1;
                  const mineralCount = mineralCounts.get(item.symbol) ?? 0;
                  return (
                    <button
                      key={item.symbol}
                      ref={(node) => { elementRefs.current[item.symbol] = node; }}
                      className={`element-cell kind-${item.kind}${isActive ? " is-active" : ""}${isConnected ? " is-connected" : ""}${isDimmed ? " is-dimmed" : ""}${compareIndex === 0 ? " compare-a" : ""}${compareIndex === 1 ? " compare-b" : ""}`}
                      style={{ gridColumn: item.col, gridRow: item.row }}
                      onMouseEnter={() => setHoveredSymbol(item.symbol)}
                      onMouseLeave={() => setHoveredSymbol(null)}
                      onFocus={() => setHoveredSymbol(item.symbol)}
                      onBlur={() => setHoveredSymbol(null)}
                      onClick={() => chooseElement(item.symbol)}
                      aria-label={`${item.name}, ${item.symbol}, atomic number ${item.number}, ${mineralCount} matching minerals`}
                      aria-pressed={pinnedSymbol === item.symbol}
                    >
                      <span className="atomic-number">{item.number}</span>
                      {isConnected
                        ? <span className="link-count" title={`${connections.get(item.symbol)?.count ?? 0} shared minerals`}>×{connections.get(item.symbol)?.count}</span>
                        : mineralCount > 0 && <span className="mineral-count" title={`${mineralCount} matching minerals`}>{mineralCount}</span>}
                      <strong>{item.symbol}</strong>
                      <small>{item.name}</small>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="table-legend">
              {Object.entries(kindLabels).map(([kind, label]) => (
                <span key={kind}><i className={`legend-swatch kind-${kind}`} />{label}</span>
              ))}
              <span className="legend-note"><Info size={12} /> Required formula elements · substitutions appear when a mineral is pinned</span>
            </div>
          </section>

          <aside className="detail-panel" aria-label={`Minerals containing ${activeElement.name}`}>
            <div className={`element-portrait kind-${activeElement.kind}`}>
              <span className="portrait-number">{activeElement.number.toString().padStart(3, "0")}</span>
              <strong>{activeElement.symbol}</strong>
              <div>
                <h2>{activeElement.name}</h2>
                <p>{kindLabels[activeElement.kind]}</p>
              </div>
            </div>

            <div className="detail-heading">
              <div>
                <span className="caption-index">02</span>
                <span>MINERAL OCCURRENCES</span>
              </div>
              <b>{elementMinerals.length.toString().padStart(2, "0")}</b>
            </div>

            <div className="mineral-list">
              {elementMinerals.length ? elementMinerals.map((mineral) => (
                <MineralCard
                  key={mineral.id}
                  mineral={mineral}
                  occupancy={listsMineralForElement(mineral, activeSymbol) ?? "required"}
                  active={activeMineralId === mineral.id}
                  onEnter={() => setHoveredMineral(mineral.id)}
                  onLeave={() => setHoveredMineral(null)}
                  onClick={() => setPinnedMineral((current) => current === mineral.id ? null : mineral.id)}
                />
              )) : (
                <div className="empty-state">
                  <span className="empty-orbit" />
                  <h3>No reference match</h3>
                  <p>No mineral in the current filter combination contains {activeElement.name}.</p>
                  <button onClick={() => { setFamily("all"); clearAdvancedFilters(); }}>Clear all filters <ChevronRight size={14} /></button>
                </div>
              )}
            </div>

            <button className="reset-button" onClick={() => {
              setPinnedSymbol("Si");
              setHoveredSymbol(null);
              setFamily("all");
              setPinnedMineral(null);
              setHoveredMineral(null);
              setCompareMode(false);
              setCompareSymbols(["Si", "O"]);
              setCompareSlot(1);
              setAdvancedOpen(false);
              setHardnessFilter("all");
              setCrystalFilter("all");
              setColorFilter("all");
            }}>
              <RotateCcw size={14} /> Reset exploration
            </button>
          </aside>
        </div>
      </section>

      <section className="map-section" aria-label="World mineral locality map">
        <div className="map-toolbar">
          <strong>Localities</strong>
          <span>{filteredLocalities.length} shown · follows active filters · classic or type localities, not occurrence ranges</span>
        </div>
        <LocalityMap
          minerals={filteredMinerals}
          selectedId={pinnedMineral}
          onSelect={handleMapSelect}
          onHover={handleMapHover}
        />
      </section>
    </main>
  );
}

function MineralCard({
  mineral,
  occupancy,
  active,
  onEnter,
  onLeave,
  onClick,
}: {
  mineral: MineralData;
  occupancy: "required" | "substitute";
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const meta = familyMeta[mineral.family];
  return (
    <article
      role="button"
      tabIndex={0}
      className={active ? "mineral-card active" : "mineral-card"}
      style={{ "--family-color": meta.color, "--family-glow": meta.glow } as React.CSSProperties}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      aria-pressed={active}
    >
      {mineral.image ? (
        <span className="mineral-photo">
          <img src={publicUrl(mineral.image)} alt={mineral.imageAlt ?? `${mineral.name} mineral specimen`} />
        </span>
      ) : <span className="mineral-gem" aria-hidden="true" />}
      <span className="mineral-copy">
        <span className="mineral-topline"><strong>{mineral.name}</strong><em>{occupancy === "substitute" ? "Substitution" : meta.label}</em></span>
        <span className="formula">{mineral.formula}</span>
        <small>{mineral.note}</small>
        <span className="mineral-traits">
          <i>H {hardnessLabel(mineral.hardness)}</i>
          <i>{titleCase(mineral.crystalSystem)}</i>
          <i>{titleCase(mineral.colorGroup)}</i>
        </span>
        {mineral.locality && (
          <span className="locality"><MapPin size={9} /> {mineral.locality}{mineral.country ? `, ${mineral.country}` : ""}</span>
        )}
        {active && (mineral.localityContext || mineral.sourceUrl || mineral.imageSourceUrl || mineral.substitutes?.length) && (
          <span className="locality-detail">
            {mineral.substitutes?.length ? <span>Optional occupants: {mineral.substitutes.join(", ")}</span> : null}
            {mineral.localityContext && <span>{mineral.localityContext}</span>}
            {mineral.sourceUrl && <a href={mineral.sourceUrl} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>Source <ArrowUpRight size={9} /></a>}
            {mineral.imageSourceUrl && <a href={mineral.imageSourceUrl} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>Photo <ArrowUpRight size={9} /></a>}
          </span>
        )}
      </span>
      <ChevronRight className="card-arrow" size={15} />
    </article>
  );
}
