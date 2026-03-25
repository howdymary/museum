import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  createChart,
  LineSeries,
  LineStyle,
  CrosshairMode,
  createSeriesMarkers,
} from "lightweight-charts";
import priceData from "../data/prices.json";
import tweetData from "../data/tweets.json";

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

const ASSET_CONFIG = {
  WTI:   { color: "#FF6B35", label: "WTI Crude" },
  Brent: { color: "#FF3B30", label: "Brent Crude" },
  Gold:  { color: "#F5A623", label: "Gold" },
  BTC:   { color: "#8B6FD4", label: "Bitcoin" },
  MAGS:  { color: "#3478F6", label: "MAGS ETF" },
};

const ASSET_ORDER = ["WTI", "Brent", "Gold", "BTC", "MAGS"];

function toChartTime(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return { year: y, month: m, day: d };
}

export default function TweetTimeline() {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRefs = useRef({});
  const markerPrimitivesRef = useRef({});
  const [selectedTweet, setSelectedTweet] = useState(null);
  const [hoveredTweet, setHoveredTweet] = useState(null);
  const [hiddenAssets, setHiddenAssets] = useState(new Set());

  const { seriesData, latestPct } = useMemo(() => {
    const byAsset = {};
    for (const r of priceData) {
      if (!byAsset[r.asset]) byAsset[r.asset] = [];
      byAsset[r.asset].push(r);
    }
    const seriesData = {};
    const latestPct = {};
    for (const asset of ASSET_ORDER) {
      const rows = byAsset[asset];
      if (!rows || rows.length === 0) continue;
      const base = rows[0].close;
      seriesData[asset] = rows.map(r => ({
        time: toChartTime(r.date),
        value: ((r.close - base) / base) * 100,
      }));
      const last = rows[rows.length - 1];
      latestPct[asset] = ((last.close - base) / base) * 100;
    }
    return { seriesData, latestPct };
  }, []);

  const tweetMarkersByAsset = useMemo(() => {
    const markers = {};
    for (const asset of ASSET_ORDER) markers[asset] = [];
    for (const tw of tweetData) {
      const primaryAsset = tw.assetTags.find(a => seriesData[a]) || tw.assetTags[0];
      if (!primaryAsset || !seriesData[primaryAsset]) continue;
      const twDate = new Date(tw.datetime).toISOString().slice(0, 10);
      markers[primaryAsset].push({
        time: toChartTime(twDate),
        position: "aboveBar",
        color: ASSET_CONFIG[primaryAsset]?.color || "#fff",
        shape: "circle",
        size: 0.5,
        id: tw.id,
      });
    }
    // Sort each by time
    for (const asset of ASSET_ORDER) {
      markers[asset].sort((a, b) => {
        const ta = a.time.year * 10000 + a.time.month * 100 + a.time.day;
        const tb = b.time.year * 10000 + b.time.month * 100 + b.time.day;
        return ta - tb;
      });
    }
    return markers;
  }, [seriesData]);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    const container = chartContainerRef.current;

    const chart = createChart(container, {
      width: container.clientWidth,
      height: 440,
      layout: {
        background: { color: "#060610" },
        textColor: "#555",
        fontFamily: "'SF Mono', 'Menlo', 'Consolas', monospace",
        fontSize: 10,
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.03)" },
        horzLines: { color: "rgba(255,255,255,0.03)" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: "rgba(255,59,48,0.3)",
          width: 1,
          style: LineStyle.Dashed,
          labelBackgroundColor: "#1a1a2a",
        },
        horzLine: {
          color: "rgba(255,255,255,0.15)",
          width: 1,
          style: LineStyle.Dashed,
          labelBackgroundColor: "#1a1a2a",
        },
      },
      rightPriceScale: {
        borderColor: "rgba(255,255,255,0.06)",
        scaleMargins: { top: 0.1, bottom: 0.1 },
      },
      timeScale: {
        borderColor: "rgba(255,255,255,0.06)",
        timeVisible: false,
        rightOffset: 2,
        fixLeftEdge: true,
        fixRightEdge: true,
      },
      handleScroll: false,
      handleScale: false,
    });
    chartRef.current = chart;

    // Add line series per asset (v5 API)
    for (const asset of ASSET_ORDER) {
      if (!seriesData[asset]) continue;
      const cfg = ASSET_CONFIG[asset];
      const series = chart.addSeries(LineSeries, {
        color: cfg.color,
        lineWidth: 2,
        lineStyle: LineStyle.Solid,
        crosshairMarkerVisible: true,
        crosshairMarkerRadius: 4,
        crosshairMarkerBorderColor: cfg.color,
        crosshairMarkerBackgroundColor: "#060610",
        priceFormat: {
          type: "custom",
          formatter: (v) => (v >= 0 ? "+" : "") + v.toFixed(1) + "%",
        },
        lastValueVisible: true,
        priceLineVisible: false,
        title: asset,
      });
      series.setData(seriesData[asset]);
      seriesRefs.current[asset] = series;

      // Add markers via createSeriesMarkers (v5 API)
      if (tweetMarkersByAsset[asset]?.length > 0) {
        const primitive = createSeriesMarkers(series, tweetMarkersByAsset[asset]);
        markerPrimitivesRef.current[asset] = primitive;
      }
    }

    // Zero line
    const allTimes = seriesData[ASSET_ORDER.find(a => seriesData[a])]?.map(d => d.time) || [];
    if (allTimes.length > 0) {
      const zeroSeries = chart.addSeries(LineSeries, {
        color: "rgba(255,255,255,0.12)",
        lineWidth: 1,
        lineStyle: LineStyle.Dashed,
        crosshairMarkerVisible: false,
        lastValueVisible: false,
        priceLineVisible: false,
      });
      zeroSeries.setData(allTimes.map(t => ({ time: t, value: 0 })));
    }

    const handleResize = () => {
      chart.applyOptions({ width: container.clientWidth });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
      chartRef.current = null;
      seriesRefs.current = {};
      markerPrimitivesRef.current = {};
    };
  }, [seriesData, tweetMarkersByAsset]);

  const toggleAsset = useCallback((asset) => {
    setHiddenAssets(prev => {
      const next = new Set(prev);
      if (next.has(asset)) {
        next.delete(asset);
      } else {
        next.add(asset);
      }
      const series = seriesRefs.current[asset];
      if (series) {
        series.applyOptions({ visible: !next.has(asset) });
      }
      return next;
    });
  }, []);

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
            Real-time price movement since February 27, 2026 — the day before the first strikes.
            Each marker is a real tweet, broadcast, or government post. The market absorbs the war in real time.
          </p>
        </div>

        {/* Legend */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px 14px",
          marginBottom: 12,
          padding: "8px 0",
          borderTop: "1px solid #111",
          borderBottom: "1px solid #111",
        }}>
          {ASSET_ORDER.map(asset => {
            const cfg = ASSET_CONFIG[asset];
            const isHidden = hiddenAssets.has(asset);
            const pct = latestPct[asset];
            return (
              <div
                key={asset}
                onClick={() => toggleAsset(asset)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  cursor: "pointer",
                  opacity: isHidden ? 0.25 : 1,
                  transition: "opacity 0.2s",
                  padding: "3px 0",
                }}
              >
                <div style={{ width: 16, height: 2, background: cfg.color, opacity: isHidden ? 0.3 : 1 }} />
                <span style={{
                  fontSize: 9, fontFamily: "monospace", letterSpacing: 1.5,
                  color: isHidden ? "#444" : cfg.color, fontWeight: 700,
                  textDecoration: isHidden ? "line-through" : "none", userSelect: "none",
                }}>
                  {asset}
                  {pct != null && (
                    <span style={{ color: isHidden ? "#333" : (pct >= 0 ? "#2A9D3A" : "#FF3B30"), fontWeight: 400, marginLeft: 4 }}>
                      {pct >= 0 ? "+" : ""}{pct.toFixed(1)}%
                    </span>
                  )}
                </span>
              </div>
            );
          })}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: "auto" }}>
            <svg width="8" height="8"><circle cx="4" cy="4" r="3" fill="none" stroke="#FF3B30" strokeWidth="1" /></svg>
            <span style={{ fontSize: 8, fontFamily: "monospace", color: "#555", letterSpacing: 1 }}>TWEET / BROADCAST</span>
          </div>
        </div>

        {/* Chart */}
        <div style={{ position: "relative" }}>
          <div
            ref={chartContainerRef}
            style={{
              border: "1px solid #1a1a2a",
              borderRadius: 4,
              overflow: "hidden",
            }}
          />
        </div>

        {/* War events strip */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "2px 8px",
          marginTop: 8, padding: "6px 0", borderBottom: "1px solid #111",
        }}>
          {WAR_EVENTS.map((evt, i) => (
            <span key={i} style={{ fontSize: 7, fontFamily: "monospace", color: "#444", letterSpacing: 0.5, whiteSpace: "nowrap" }}>
              <span style={{ color: "rgba(255,59,48,0.4)" }}>{evt.short}</span>
              <span style={{ color: "#333", marginLeft: 3 }}>
                {new Date(evt.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
              {i < WAR_EVENTS.length - 1 && <span style={{ color: "#222", margin: "0 2px" }}>/</span>}
            </span>
          ))}
        </div>

        {/* Tweet cards */}
        <div style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 8,
          maxHeight: 380,
          overflowY: "auto",
        }}>
          {tweetData.map(tw => {
            const primaryAsset = tw.assetTags.find(a => ASSET_CONFIG[a]) || tw.assetTags[0];
            const color = ASSET_CONFIG[primaryAsset]?.color || "#888";
            const isActive = activeTweet === tw.id;
            return (
              <div
                key={tw.id}
                onMouseEnter={() => setHoveredTweet(tw.id)}
                onMouseLeave={() => setHoveredTweet(null)}
                onClick={() => setSelectedTweet(selectedTweet === tw.id ? null : tw.id)}
                style={{
                  background: isActive ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.015)",
                  border: `1px solid ${isActive ? color + "44" : "#1a1a2a"}`,
                  borderRadius: 4, padding: "10px 12px", cursor: "pointer",
                  transition: "all 0.2s", position: "relative", overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color, opacity: isActive ? 0.8 : 0.3 }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: "#fff", fontFamily: "monospace" }}>{tw.author}</span>
                    {tw.isVerified && <span style={{ fontSize: 7, color }}>&#10003;</span>}
                  </div>
                  <span style={{ fontSize: 7, color: "#666", fontFamily: "monospace" }}>
                    {new Date(tw.datetime).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
                {tw.handle && <div style={{ fontSize: 7, color: "#555", fontFamily: "monospace", marginBottom: 5 }}>{tw.handle}</div>}
                <div style={{
                  fontSize: 10, color: "#bbb", lineHeight: 1.5, marginBottom: 7,
                  display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>
                  {tw.text}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 3 }}>
                    {tw.assetTags.slice(0, 3).map(tag => (
                      <span key={tag} style={{
                        fontSize: 6, fontFamily: "monospace", letterSpacing: 1,
                        color: ASSET_CONFIG[tag]?.color || "#888",
                        padding: "1px 3px", border: `1px solid ${(ASSET_CONFIG[tag]?.color || "#888")}33`, borderRadius: 2,
                      }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    {tw.views && <span style={{ fontSize: 6, color: "#666", fontFamily: "monospace" }}>{tw.views}</span>}
                    {tw.url && (
                      <a href={tw.url} target="_blank" rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ fontSize: 7, color: "#FF3B30", fontFamily: "monospace", fontWeight: 700, letterSpacing: 1, textDecoration: "none" }}>
                        SOURCE &#8599;
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginTop: 10, padding: "6px 0", flexWrap: "wrap", gap: 8,
        }}>
          <span style={{ fontSize: 7, color: "#333", fontFamily: "monospace", letterSpacing: 2 }}>
            NORMALIZED % CHANGE FROM FEB 27 CLOSE · CLICK LEGEND TO TOGGLE
          </span>
          <span style={{ fontSize: 7, color: "#333", fontFamily: "monospace", letterSpacing: 2 }}>
            SOURCE: YAHOO FINANCE · DAILY CLOSE · REAL DATA
          </span>
        </div>
      </div>
    </div>
  );
}
