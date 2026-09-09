import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronRight,
  Info,
  Maximize2,
  Minimize2,
  RotateCcw,
  Search,
  Sparkles,
} from "lucide-react";
import {
  elements,
  familyMeta,
  minerals,
  type MineralData,
  type MineralFamily,
} from "@/lib/mineralData";

const filters: Array<{ id: "all" | MineralFamily; label: string }> = [
  { id: "all", label: "All families" },
  { id: "silicate", label: "Silicates" },
  { id: "carbonate", label: "Carbonates" },
  { id: "sulfide", label: "Sulfides" },
  { id: "oxide", label: "Oxides" },
  { id: "halide", label: "Halides" },
  { id: "sulfate", label: "Sulfates" },
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

export default function Home() {
  const [pinnedSymbol, setPinnedSymbol] = useState("Si");
  const [hoveredSymbol, setHoveredSymbol] = useState<string | null>(null);
  const [family, setFamily] = useState<"all" | MineralFamily>("all");
  const [query, setQuery] = useState("");
  const [hoveredMineral, setHoveredMineral] = useState<string | null>(null);
  const [pinnedMineral, setPinnedMineral] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [uiError, setUiError] = useState<string | null>(null);
  const [lineGeometry, setLineGeometry] = useState<Array<{ symbol: string; x1: number; y1: number; x2: number; y2: number; family: MineralFamily; weight: number }>>([]);

  const appRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const elementRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeSymbol = hoveredSymbol ?? pinnedSymbol;
  const activeElement = elements.find((item) => item.symbol === activeSymbol) ?? elements[13];
  const activeMineralId = hoveredMineral ?? pinnedMineral;

  const filteredMinerals = useMemo(
    () => (family === "all" ? minerals : minerals.filter((mineral) => mineral.family === family)),
    [family],
  );

  const elementMinerals = useMemo(
    () => filteredMinerals.filter((mineral) => mineral.elements.includes(activeSymbol)),
    [activeSymbol, filteredMinerals],
  );

  const visibleMinerals = useMemo(() => {
    if (!activeMineralId) return elementMinerals;
    const focused = elementMinerals.find((mineral) => mineral.id === activeMineralId);
    return focused ? [focused] : elementMinerals;
  }, [activeMineralId, elementMinerals]);

  const connections = useMemo(() => {
    const bySymbol = new Map<string, { family: MineralFamily; count: number }>();
    visibleMinerals.forEach((mineral) => {
      mineral.elements.forEach((symbol) => {
        if (symbol === activeSymbol) return;
        const current = bySymbol.get(symbol);
        bySymbol.set(symbol, {
          family: current?.family ?? mineral.family,
          count: (current?.count ?? 0) + 1,
        });
      });
    });
    return bySymbol;
  }, [activeSymbol, visibleMinerals]);

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
    setPinnedSymbol(symbol);
    setHoveredSymbol(null);
    setPinnedMineral(null);
    setHoveredMineral(null);
    setQuery("");
    setUiError(null);
  };

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
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="Mineral Periodic Atlas home">
          <span className="brand-mark" aria-hidden="true"><span>Si</span></span>
          <span>
            <strong>MINERAL</strong>
            <em>Periodic Atlas</em>
          </span>
        </a>
        <div className="topbar-meta" aria-label="Dataset summary">
          <span><b>{elements.length}</b> elements</span>
          <span><b>{minerals.length}</b> reference minerals</span>
        </div>
        <button className="icon-button" onClick={toggleFullscreen} aria-label={isFullscreen ? "Exit full screen" : "View full screen"}>
          {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          <span>{isFullscreen ? "Exit" : "Full screen"}</span>
        </button>
      </header>

      <section className="intro" id="top">
        <div>
          <p className="eyebrow"><Sparkles size={13} /> Interactive mineral chemistry</p>
          <h1>Trace the chemistry<br />inside <i>stone.</i></h1>
        </div>
        <div className="intro-copy">
          <p>Hover over any element to reveal the other elements it commonly combines with in selected minerals.</p>
          <div className="interaction-key"><span className="pulse-dot" /> Hover to explore · click to pin</div>
        </div>
      </section>

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

        {(uiError || dataIssues.length > 0) && (
          <div className="error-banner" role="alert">
            <Info size={15} /> {uiError ?? `Dataset check found ${dataIssues.length} invalid reference${dataIssues.length === 1 ? "" : "s"}.`}
          </div>
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
                  return (
                    <button
                      key={item.symbol}
                      ref={(node) => { elementRefs.current[item.symbol] = node; }}
                      className={`element-cell kind-${item.kind}${isActive ? " is-active" : ""}${isConnected ? " is-connected" : ""}${isDimmed ? " is-dimmed" : ""}`}
                      style={{ gridColumn: item.col, gridRow: item.row }}
                      onMouseEnter={() => setHoveredSymbol(item.symbol)}
                      onMouseLeave={() => setHoveredSymbol(null)}
                      onFocus={() => setHoveredSymbol(item.symbol)}
                      onBlur={() => setHoveredSymbol(null)}
                      onClick={() => chooseElement(item.symbol)}
                      aria-label={`${item.name}, ${item.symbol}, atomic number ${item.number}`}
                      aria-pressed={pinnedSymbol === item.symbol}
                    >
                      <span className="atomic-number">{item.number}</span>
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
              <span className="legend-note"><Info size={12} /> Line weight reflects repeated associations</span>
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
                  active={activeMineralId === mineral.id}
                  onEnter={() => setHoveredMineral(mineral.id)}
                  onLeave={() => setHoveredMineral(null)}
                  onClick={() => setPinnedMineral((current) => current === mineral.id ? null : mineral.id)}
                />
              )) : (
                <div className="empty-state">
                  <span className="empty-orbit" />
                  <h3>No reference match</h3>
                  <p>No mineral in the current {family === "all" ? "dataset" : familyMeta[family].label.toLowerCase()} filter contains {activeElement.name}.</p>
                  <button onClick={() => setFamily("all")}>Show all families <ChevronRight size={14} /></button>
                </div>
              )}
            </div>

            <button className="reset-button" onClick={() => {
              setPinnedSymbol("Si");
              setHoveredSymbol(null);
              setFamily("all");
              setPinnedMineral(null);
              setHoveredMineral(null);
            }}>
              <RotateCcw size={14} /> Reset exploration
            </button>
          </aside>
        </div>
      </section>

      <footer className="data-note">
        <div><Info size={14} /><strong>How to read this atlas</strong></div>
        <p>Connections represent co-occurrence within the displayed idealized mineral formulas—not chemical bonds, abundance, or phase stability. Group formulas and solid solutions are simplified to their principal listed elements.</p>
        <a href="https://www.mindat.org/" target="_blank" rel="noreferrer">Explore mineral references <ArrowUpRight size={13} /></a>
      </footer>
    </main>
  );
}

function MineralCard({
  mineral,
  active,
  onEnter,
  onLeave,
  onClick,
}: {
  mineral: MineralData;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const meta = familyMeta[mineral.family];
  return (
    <button
      className={active ? "mineral-card active" : "mineral-card"}
      style={{ "--family-color": meta.color, "--family-glow": meta.glow } as React.CSSProperties}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onClick}
      aria-pressed={active}
    >
      <span className="mineral-gem" aria-hidden="true" />
      <span className="mineral-copy">
        <span className="mineral-topline"><strong>{mineral.name}</strong><em>{meta.label}</em></span>
        <span className="formula">{mineral.formula}</span>
        <small>{mineral.note}</small>
      </span>
      <ChevronRight className="card-arrow" size={15} />
    </button>
  );
}
