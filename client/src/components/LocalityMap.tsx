import { useEffect, useMemo, useRef } from "react";
import { ExternalLink, LocateFixed, MapPin } from "lucide-react";
import { familyMeta, type MineralData } from "@/lib/mineralData";

interface LocalityMapProps {
  minerals: MineralData[];
  selectedId: string | null;
  onSelect: (mineral: MineralData) => void;
  onHover: (id: string | null) => void;
}

export default function LocalityMap({ minerals, selectedId, onSelect, onHover }: LocalityMapProps) {
  const listRef = useRef<HTMLDivElement | null>(null);

  const mappedMinerals = useMemo(
    () => minerals.filter((mineral) => mineral.coordinates && mineral.locality),
    [minerals],
  );

  useEffect(() => {
    if (!selectedId) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-mineral-id="${selectedId}"]`)
      ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selectedId]);

  if (!mappedMinerals.length) {
    return (
      <div className="locality-map-layout">
        <div className="map-frame">
          <div className="map-error empty" role="status">
            <MapPin size={24} />
            <strong>No localities match</strong>
            <p>Clear or broaden the mineral filters to restore map markers.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="locality-map-layout">
      <div className="map-frame">
        <ProjectedWorldMap minerals={mappedMinerals} selectedId={selectedId} onSelect={onSelect} onHover={onHover} />
        <div className="map-scale"><span /> Filtered specimen localities</div>
      </div>

      <div className="locality-index" ref={listRef}>
        {mappedMinerals.map((mineral, index) => (
          <article
            key={mineral.id}
            data-mineral-id={mineral.id}
            role="button"
            tabIndex={0}
            className={selectedId === mineral.id ? "locality-row active" : "locality-row"}
            style={{ "--marker-color": familyMeta[mineral.family].color } as React.CSSProperties}
            onMouseEnter={() => onHover(mineral.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onSelect(mineral)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(mineral);
              }
            }}
            aria-pressed={selectedId === mineral.id}
          >
            <span className="locality-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="locality-pin"><MapPin size={12} /></span>
            <span>
              <strong>{mineral.name}</strong>
              <small>{mineral.locality}, {mineral.country}</small>
            </span>
            {mineral.sourceUrl && (
              <a href={mineral.sourceUrl} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()} aria-label={`Open ${mineral.name} locality source`}><ExternalLink size={12} /></a>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

function ProjectedWorldMap({ minerals, selectedId, onSelect, onHover }: LocalityMapProps) {
  return (
    <div className="projection-map" role="img" aria-label={`World map with ${minerals.length} filtered mineral localities`}>
      <svg viewBox="0 0 1000 500" aria-hidden="true">
        <g className="graticule">
          {[100, 200, 300, 400].map((y) => <line key={`y-${y}`} x1="0" x2="1000" y1={y} y2={y} />)}
          {[125, 250, 375, 500, 625, 750, 875].map((x) => <line key={`x-${x}`} x1={x} x2={x} y1="0" y2="500" />)}
        </g>
        <g className="continents">
          <path d="M52 92 L115 40 196 49 235 83 295 86 319 118 289 146 247 145 229 176 186 188 166 229 128 217 112 180 73 160 43 124Z" />
          <path d="M239 221 L287 238 319 286 304 352 272 423 239 384 223 313 205 264Z" />
          <path d="M445 92 L481 66 532 72 563 58 624 72 675 60 742 79 806 89 866 123 840 157 784 167 752 197 690 189 650 156 599 168 560 151 515 160 474 139 433 124Z" />
          <path d="M493 173 L548 162 594 202 610 261 580 336 537 367 504 328 487 269 455 219Z" />
          <path d="M724 192 L764 208 784 258 759 288 722 260 703 224Z" />
          <path d="M814 348 L875 329 930 359 914 401 853 414 802 386Z" />
          <path d="M272 26 L330 12 372 40 345 75 291 67Z" />
          <path d="M888 195 L901 214 892 242 880 219Z" />
        </g>
      </svg>
      {minerals.map((mineral) => {
        if (!mineral.coordinates) return null;
        const left = ((mineral.coordinates.lng + 180) / 360) * 100;
        const top = ((90 - mineral.coordinates.lat) / 180) * 100;
        return (
          <button
            key={mineral.id}
            className={selectedId === mineral.id ? "projection-marker selected" : "projection-marker"}
            style={{ left: `${left}%`, top: `${top}%`, "--marker-color": familyMeta[mineral.family].color } as React.CSSProperties}
            onMouseEnter={() => onHover(mineral.id)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(mineral.id)}
            onBlur={() => onHover(null)}
            onClick={() => onSelect(mineral)}
            aria-label={`${mineral.name}, ${mineral.locality}`}
            aria-pressed={selectedId === mineral.id}
          >
            <i />
            <span><strong>{mineral.name}</strong><small>{mineral.locality}</small></span>
          </button>
        );
      })}
      <div className="projection-status"><LocateFixed size={12} /> Equirectangular projection</div>
    </div>
  );
}
