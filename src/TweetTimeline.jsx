import React, { useState, useMemo, useRef, useEffect } from "react";
import priceData from "../data/prices.json";
import tweetData from "../data/tweets.json";

// War events (subset of EVTS from App.jsx, key inflection points only)
const WAR_EVENTS = [
  { date: "2026-02-28", label: "OPERATION EPIC FURY BEGINS", short: "D0" },
  { date: "2026-02-28", label: "HORMUZ CLOSED", short: "HORMUZ" },
  { date: "2026-03-01", label: "HEZBOLLAH OPENS 2ND FRONT", short: "HEZ" },
  { date: "2026-03-04", label: "F-35I DOWNS YAK-130", short: "AIR" },
  { date: "2026-03-05", label: "3 F-15Es FRIENDLY FIRE", short: "FF" },
  { date: "2026-03-09", label: "UAE: 1,440 DRONES INTERCEPTED", short: "UAE" },
  { date: "2026-03-12", label: "KC-135 CRASH, 6 KIA", short: "KIA" },
  { date: "2026-03-18", label: "SOUTH PARS GAS FIELD STRUCK", short: "GAS" },
  { date: "2026-03-19", label: "F-35A HIT BY IRANIAN SAM", short: "F-35" },
  { date: "2026-03-21", label: "DIMONA STRUCK, INTERCEPTORS FAIL", short: "DIMONA" },
];

const ASSET_COLORS = {
  WTI:   "#FF6B35",
  Brent: "#FF3B30",
  Gold:  "#F5A623",
  BTC:   "#8B6FD4",
  MAGS:  "#3478F6",
};

const ASSET_ORDER = ["WTI", "Brent", "Gold", "BTC", "MAGS"];

export default function TweetTimeline() {
  const [hoveredTweet, setHoveredTweet] = useState(null);
  const [selectedTweet, setSelectedTweet] = useState(null);
  const [hoveredAsset, setHoveredAsset] = useState(null);
  const svgRef = useRef(null);
  const [dims, setDims] = useState({ w: 900, h: 420 });

  // Responsive sizing
  useEffect(() => {
    const measure = () => {
      if (svgRef.current) {
        const w = svgRef.current.parentElement.clientWidth;
        setDims({ w: Math.max(320, w), h: Math.min(460, Math.max(320, w * 0.48)) });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Compute normalized % change series
  const { series, allDates, dateRange, yMin, yMax } = useMemo(() => {
    const byAsset = {};
    for (const r of priceData) {
      if (!byAsset[r.asset]) byAsset[r.asset] = [];
      byAsset[r.asset].push(r);
    }

    const series = {};
    const allDatesSet = new Set();

    for (const asset of ASSET_ORDER) {
      const rows = byAsset[asset];
      if (!rows || rows.length === 0) continue;
      const base = rows[0].close;
      series[asset] = rows.map(r => {
        allDatesSet.add(r.date);
        return { date: r.date, pct: ((r.close - base) / base) * 100 };
      });
    }

    const allDates = [...allDatesSet].sort();
    const dateRange = {
      start: new Date(allDates[0] + "T00:00:00"),
      end: new Date(allDates[allDates.length - 1] + "T00:00:00"),
    };

    let yMin = -15, yMax = 15;
    for (const asset of Object.keys(series)) {
      for (const pt of series[asset]) {
        if (pt.pct < yMin) yMin = pt.pct;
        if (pt.pct > yMax) yMax = pt.pct;
      }
    }
    // Add padding
    yMin = Math.floor(yMin / 5) * 5 - 5;
    yMax = Math.ceil(yMax / 5) * 5 + 5;

    return { series, allDates, dateRange, yMin, yMax };
  }, []);

  const { w, h } = dims;
  const pad = { top: 32, right: 24, bottom: 56, left: 52 };
  const cw = w - pad.left - pad.right;
  const ch = h - pad.top - pad.bottom;

  const xScale = (dateStr) => {
    const d = new Date(dateStr + "T00:00:00");
    const t = (d - dateRange.start) / (dateRange.end - dateRange.start);
    return pad.left + t * cw;
  };

  const yScale = (pct) => {
    const t = (pct - yMin) / (yMax - yMin);
    return pad.top + ch - t * ch;
  };

  const xScaleDateTime = (dt) => {
    const d = new Date(dt);
    const dayStart = new Date(d.toISOString().slice(0, 10) + "T00:00:00");
    const t = (dayStart - dateRange.start) / (dateRange.end - dateRange.start);
    return pad.left + Math.max(0, Math.min(1, t)) * cw;
  };

  // Build SVG path for each asset
  const paths = useMemo(() => {
    const result = {};
    for (const asset of ASSET_ORDER) {
      if (!series[asset]) continue;
      const pts = series[asset].map(p => `${xScale(p.date)},${yScale(p.pct)}`);
      result[asset] = `M${pts.join("L")}`;
    }
    return result;
  }, [series, w, h]);

  // Y-axis gridlines
  const yTicks = [];
  for (let v = yMin; v <= yMax; v += 5) {
    yTicks.push(v);
  }

  // X-axis date labels (show every ~4th date)
  const xLabels = allDates.filter((_, i) => i % 4 === 0 || i === allDates.length - 1);

  const activeTweet = selectedTweet || hoveredTweet;

  return (
    <div style={{
      background: "#020408",
      borderBottom: "1px solid #1a1a1a",
      padding: "40px 20px 50px",
    }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 9, letterSpacing: 5, color: "#FF3B30", fontFamily: "monospace", marginBottom: 10 }}>
            INTERACTIVE EXHIBIT
          </div>
          <h2 style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 42,
            color: "#fff",
            letterSpacing: 2,
            lineHeight: 1,
            marginBottom: 6,
          }}>
            THE MARKET NARRATIVE
          </h2>
          <p style={{ fontSize: 14, color: "#ccc", fontStyle: "italic", maxWidth: 640, lineHeight: 1.6 }}>
            Normalized price movement since February 27, 2026. Each dot is a real tweet or broadcast.
            Hover to read. The market absorbs the war in real time.
          </p>
        </div>

        {/* Legend */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px 16px",
          marginBottom: 16,
          padding: "8px 0",
          borderTop: "1px solid #111",
          borderBottom: "1px solid #111",
        }}>
          {ASSET_ORDER.map(asset => (
            <div
              key={asset}
              onMouseEnter={() => setHoveredAsset(asset)}
              onMouseLeave={() => setHoveredAsset(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                cursor: "pointer",
                opacity: hoveredAsset && hoveredAsset !== asset ? 0.3 : 1,
                transition: "opacity 0.2s",
              }}
            >
              <div style={{
                width: 16, height: 2,
                background: ASSET_COLORS[asset],
              }} />
              <span style={{
                fontSize: 9,
                fontFamily: "monospace",
                letterSpacing: 1.5,
                color: ASSET_COLORS[asset],
                fontWeight: 700,
              }}>
                {asset}
                {series[asset] && series[asset].length > 0 && (
                  <span style={{ color: "#888", fontWeight: 400, marginLeft: 4 }}>
                    {series[asset][series[asset].length - 1].pct >= 0 ? "+" : ""}
                    {series[asset][series[asset].length - 1].pct.toFixed(1)}%
                  </span>
                )}
              </span>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: "auto" }}>
            <div style={{ width: 1, height: 10, background: "rgba(255,59,48,0.4)" }} />
            <span style={{ fontSize: 8, fontFamily: "monospace", color: "#666", letterSpacing: 1 }}>WAR EVENT</span>
          </div>
        </div>

        {/* SVG Chart */}
        <div ref={svgRef} style={{
          background: "#060610",
          border: "1px solid #1a1a2a",
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
        }}>
          <svg
            viewBox={`0 0 ${w} ${h}`}
            style={{ width: "100%", display: "block" }}
            onMouseLeave={() => setHoveredTweet(null)}
          >
            {/* Background */}
            <rect width={w} height={h} fill="#060610" />

            {/* Grid */}
            {yTicks.map(v => (
              <g key={v}>
                <line
                  x1={pad.left} y1={yScale(v)}
                  x2={w - pad.right} y2={yScale(v)}
                  stroke={v === 0 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.04)"}
                  strokeWidth={v === 0 ? 1 : 0.5}
                />
                <text
                  x={pad.left - 6} y={yScale(v) + 3}
                  textAnchor="end"
                  fill={v === 0 ? "#888" : "#555"}
                  fontSize={8}
                  fontFamily="monospace"
                >
                  {v > 0 ? "+" : ""}{v}%
                </text>
              </g>
            ))}

            {/* X-axis labels */}
            {xLabels.map(d => (
              <text
                key={d}
                x={xScale(d)}
                y={h - pad.bottom + 16}
                textAnchor="middle"
                fill="#555"
                fontSize={8}
                fontFamily="monospace"
              >
                {new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </text>
            ))}

            {/* War event markers */}
            {WAR_EVENTS.map((evt, i) => {
              const x = xScale(evt.date);
              if (x < pad.left || x > w - pad.right) return null;
              return (
                <g key={i}>
                  <line
                    x1={x} y1={pad.top}
                    x2={x} y2={h - pad.bottom}
                    stroke="rgba(255,59,48,0.15)"
                    strokeWidth={1}
                    strokeDasharray="3,4"
                  />
                  <text
                    x={x}
                    y={h - pad.bottom + 30}
                    textAnchor="middle"
                    fill="rgba(255,59,48,0.35)"
                    fontSize={6}
                    fontFamily="monospace"
                    letterSpacing={0.5}
                  >
                    {evt.short}
                  </text>
                </g>
              );
            })}

            {/* Price lines */}
            {ASSET_ORDER.map(asset => {
              if (!paths[asset]) return null;
              const dimmed = hoveredAsset && hoveredAsset !== asset;
              return (
                <path
                  key={asset}
                  d={paths[asset]}
                  fill="none"
                  stroke={ASSET_COLORS[asset]}
                  strokeWidth={hoveredAsset === asset ? 2.5 : 1.5}
                  opacity={dimmed ? 0.12 : 0.85}
                  strokeLinejoin="round"
                  style={{ transition: "opacity 0.2s, stroke-width 0.2s" }}
                />
              );
            })}

            {/* Endpoint dots */}
            {ASSET_ORDER.map(asset => {
              if (!series[asset] || series[asset].length === 0) return null;
              const last = series[asset][series[asset].length - 1];
              const dimmed = hoveredAsset && hoveredAsset !== asset;
              return (
                <circle
                  key={`dot-${asset}`}
                  cx={xScale(last.date)}
                  cy={yScale(last.pct)}
                  r={3}
                  fill={ASSET_COLORS[asset]}
                  opacity={dimmed ? 0.15 : 1}
                  style={{ transition: "opacity 0.2s" }}
                />
              );
            })}

            {/* Tweet dots */}
            {tweetData.map((tw, i) => {
              const x = xScaleDateTime(tw.datetime);
              // Place dot on the line of its primary asset tag
              const primaryAsset = tw.assetTags.find(a => series[a]) || tw.assetTags[0];
              const assetSeries = series[primaryAsset];
              if (!assetSeries) return null;

              const twDate = new Date(tw.datetime).toISOString().slice(0, 10);
              const closest = assetSeries.reduce((best, pt) =>
                Math.abs(new Date(pt.date) - new Date(twDate)) < Math.abs(new Date(best.date) - new Date(twDate)) ? pt : best
              );
              const y = yScale(closest.pct);
              const isActive = activeTweet === tw.id;

              return (
                <g key={tw.id}>
                  {/* Glow ring on hover */}
                  {isActive && (
                    <circle
                      cx={x} cy={y} r={10}
                      fill="none"
                      stroke={ASSET_COLORS[primaryAsset]}
                      strokeWidth={1}
                      opacity={0.4}
                    />
                  )}
                  <circle
                    cx={x} cy={y}
                    r={isActive ? 5 : 3.5}
                    fill="#060610"
                    stroke={ASSET_COLORS[primaryAsset]}
                    strokeWidth={isActive ? 2 : 1.5}
                    cursor="pointer"
                    onMouseEnter={() => setHoveredTweet(tw.id)}
                    onClick={() => setSelectedTweet(selectedTweet === tw.id ? null : tw.id)}
                    style={{ transition: "r 0.15s" }}
                  />
                  {/* Small inner dot */}
                  <circle
                    cx={x} cy={y} r={1.5}
                    fill={ASSET_COLORS[primaryAsset]}
                    pointerEvents="none"
                  />
                </g>
              );
            })}
          </svg>

          {/* Tweet card overlay */}
          {activeTweet && (() => {
            const tw = tweetData.find(t => t.id === activeTweet);
            if (!tw) return null;
            const x = xScaleDateTime(tw.datetime);
            const primaryAsset = tw.assetTags.find(a => series[a]) || tw.assetTags[0];
            const xPct = ((x - pad.left) / cw) * 100;
            const flipRight = xPct > 65;

            return (
              <div style={{
                position: "absolute",
                top: 20,
                [flipRight ? "right" : "left"]: flipRight ? `${100 - xPct + 2}%` : `${xPct + 2}%`,
                width: 280,
                background: "rgba(6,6,16,0.95)",
                border: `1px solid ${ASSET_COLORS[primaryAsset]}33`,
                borderRadius: 4,
                padding: "12px 14px",
                zIndex: 10,
                backdropFilter: "blur(8px)",
                boxShadow: `0 4px 24px rgba(0,0,0,0.6), 0 0 12px ${ASSET_COLORS[primaryAsset]}11`,
                pointerEvents: selectedTweet ? "auto" : "none",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#fff",
                      fontFamily: "monospace",
                    }}>
                      {tw.author}
                    </span>
                    {tw.isVerified && (
                      <span style={{ fontSize: 8, color: ASSET_COLORS[primaryAsset] }}>&#10003;</span>
                    )}
                  </div>
                  <span style={{
                    fontSize: 7,
                    color: "#888",
                    fontFamily: "monospace",
                  }}>
                    {new Date(tw.datetime).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
                {tw.handle && (
                  <div style={{ fontSize: 8, color: "#666", fontFamily: "monospace", marginBottom: 6 }}>
                    {tw.handle}
                  </div>
                )}
                <div style={{
                  fontSize: 11,
                  color: "#ccc",
                  lineHeight: 1.55,
                  marginBottom: 8,
                  fontFamily: "Georgia, serif",
                }}>
                  {tw.text}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    {tw.assetTags.map(tag => (
                      <span key={tag} style={{
                        fontSize: 7,
                        fontFamily: "monospace",
                        letterSpacing: 1,
                        color: ASSET_COLORS[tag] || "#888",
                        padding: "1px 4px",
                        border: `1px solid ${(ASSET_COLORS[tag] || "#888")}44`,
                        borderRadius: 2,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    {tw.views && (
                      <span style={{ fontSize: 7, color: "#888", fontFamily: "monospace" }}>
                        {tw.views} views
                      </span>
                    )}
                    {tw.url && (
                      <a
                        href={tw.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: 7,
                          color: "#FF3B30",
                          fontFamily: "monospace",
                          fontWeight: 700,
                          letterSpacing: 1,
                          textDecoration: "none",
                          pointerEvents: "auto",
                        }}
                      >
                        SOURCE &#8599;
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Bottom caption */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
          padding: "6px 0",
        }}>
          <span style={{ fontSize: 7, color: "#444", fontFamily: "monospace", letterSpacing: 2 }}>
            NORMALIZED % CHANGE FROM FEB 27 CLOSE
          </span>
          <span style={{ fontSize: 7, color: "#444", fontFamily: "monospace", letterSpacing: 2 }}>
            SOURCE: YAHOO FINANCE · DAILY CLOSE
          </span>
        </div>

        {/* Instruction */}
        <div style={{ textAlign: "center", marginTop: 4 }}>
          <span style={{ fontSize: 8, letterSpacing: 3, color: "#333", fontFamily: "monospace" }}>
            HOVER DOTS TO READ TWEETS · CLICK TO PIN · HOVER LEGEND TO ISOLATE
          </span>
        </div>
      </div>
    </div>
  );
}
