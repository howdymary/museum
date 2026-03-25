import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  createChart,
  CandlestickSeries,
  LineStyle,
  CrosshairMode,
  createSeriesMarkers,
} from "lightweight-charts";
import tweetData from "../data/tweets.json";

const TIMEFRAMES = ["1m", "5m", "15m", "1D"];

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

const ASSETS = [
  { key: "WTI",   label: "WTI CRUDE",   color: "#FF6B35" },
  { key: "Brent", label: "BRENT CRUDE",  color: "#FF3B30" },
  { key: "Gold",  label: "GOLD",         color: "#F5A623" },
  { key: "BTC",   label: "BITCOIN",      color: "#8B6FD4" },
  { key: "MAGS",  label: "MAGS ETF",     color: "#3478F6" },
];

function toChartTime(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return { year: y, month: m, day: d };
}

export default function TweetTimeline() {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const markerPrimitiveRef = useRef(null);
  const [selectedAsset, setSelectedAsset] = useState("WTI");
  const [timeframe, setTimeframe] = useState("1D");
  const [ohlcData, setOhlcData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTweet, setSelectedTweet] = useState(null);
  const [hoveredTweet, setHoveredTweet] = useState(null);

  // Fetch OHLC data on timeframe change
  useEffect(() => {
    setLoading(true);
    const file = `ohlc_${timeframe === "1D" ? "1d" : timeframe}.json`;
    fetch(`/data/${file}`)
      .then(r => {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setOhlcData(data);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error("[TweetTimeline] fetch failed:", e);
        setLoading(false);
      });
  }, [timeframe]);

  // Build candle data for selected asset
  const candleData = useMemo(() => {
    if (!ohlcData) return [];
    const isDaily = timeframe === "1D";
    return ohlcData
      .filter(r => r.asset === selectedAsset)
      .map(r => ({
        time: isDaily ? toChartTime(r.time) : r.time,
        open: r.open,
        high: r.high,
        low: r.low,
        close: r.close,
      }));
  }, [ohlcData, selectedAsset, timeframe]);

  const priceInfo = useMemo(() => {
    if (candleData.length === 0) return null;
    const first = candleData[0];
    const last = candleData[candleData.length - 1];
    const change = last.close - first.open;
    const changePct = (change / first.open) * 100;
    return { price: last.close, change, changePct, isUp: change >= 0 };
  }, [candleData]);

  // Tweet markers (daily view only)
  const markers = useMemo(() => {
    if (timeframe !== "1D") return [];
    return tweetData
      .filter(tw => tw.assetTags.includes(selectedAsset))
      .map(tw => {
        const twDate = new Date(tw.datetime).toISOString().slice(0, 10);
        return {
          time: toChartTime(twDate),
          position: "aboveBar",
          color: "#FF3B30",
          shape: "arrowDown",
          text: tw.author.split(" ")[0],
          size: 1,
          id: tw.id,
        };
      })
      .sort((a, b) => {
        const ta = a.time.year * 10000 + a.time.month * 100 + a.time.day;
        const tb = b.time.year * 10000 + b.time.month * 100 + b.time.day;
        return ta - tb;
      });
  }, [selectedAsset, timeframe]);

  // Chart lifecycle
  useEffect(() => {
    if (!chartContainerRef.current || candleData.length === 0) return;
    const container = chartContainerRef.current;

    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
      candleSeriesRef.current = null;
      markerPrimitiveRef.current = null;
    }

    const assetCfg = ASSETS.find(a => a.key === selectedAsset);
    const upColor = assetCfg?.color || "#26a69a";
    const downColor = "#FF3B30";

    const chart = createChart(container, {
      width: container.clientWidth,
      height: 460,
      layout: {
        background: { color: "#060610" },
        textColor: "#666",
        fontFamily: "'SF Mono', 'Menlo', 'Consolas', monospace",
        fontSize: 10,
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.025)" },
        horzLines: { color: "rgba(255,255,255,0.025)" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: "rgba(255,59,48,0.25)",
          width: 1,
          style: LineStyle.Dashed,
          labelBackgroundColor: "#1a1a2a",
        },
        horzLine: {
          color: "rgba(255,255,255,0.1)",
          width: 1,
          style: LineStyle.Dashed,
          labelBackgroundColor: "#1a1a2a",
        },
      },
      rightPriceScale: {
        borderColor: "rgba(255,255,255,0.06)",
        scaleMargins: { top: 0.08, bottom: 0.08 },
      },
      timeScale: {
        borderColor: "rgba(255,255,255,0.06)",
        timeVisible: timeframe !== "1D",
        secondsVisible: false,
        rightOffset: 3,
        fixLeftEdge: true,
        fixRightEdge: true,
      },
    });
    chartRef.current = chart;

    const candles = chart.addSeries(CandlestickSeries, {
      upColor,
      downColor,
      borderUpColor: upColor,
      borderDownColor: downColor,
      wickUpColor: upColor,
      wickDownColor: downColor,
      priceFormat: {
        type: "price",
        precision: selectedAsset === "BTC" ? 0 : 2,
        minMove: selectedAsset === "BTC" ? 1 : 0.01,
      },
    });
    candles.setData(candleData);
    candleSeriesRef.current = candles;

    if (markers.length > 0) {
      markerPrimitiveRef.current = createSeriesMarkers(candles, markers);
    }

    chart.timeScale().fitContent();

    const handleResize = () => chart.applyOptions({ width: container.clientWidth });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
      chartRef.current = null;
      candleSeriesRef.current = null;
      markerPrimitiveRef.current = null;
    };
  }, [candleData, markers, selectedAsset, timeframe]);

  const activeTweet = selectedTweet || hoveredTweet;

  return (
    <div style={{ background: "#020408", borderBottom: "1px solid #1a1a1a", padding: "40px 20px 50px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 9, letterSpacing: 5, color: "#FF3B30", fontFamily: "monospace", marginBottom: 10 }}>INTERACTIVE EXHIBIT</div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 42, color: "#fff", letterSpacing: 2, lineHeight: 1, marginBottom: 6 }}>THE MARKET NARRATIVE</h2>
          <p style={{ fontSize: 14, color: "#ccc", fontStyle: "italic", maxWidth: 640, lineHeight: 1.6 }}>
            Live OHLC candle data since February 27, 2026. Select an asset and timeframe.
            Markers on the daily chart show real tweets and broadcasts as the war unfolded.
          </p>
        </div>

        {/* Asset selector + price */}
        <div style={{
          display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6,
          marginBottom: 10, padding: "8px 0", borderTop: "1px solid #111", borderBottom: "1px solid #111",
        }}>
          {ASSETS.map(a => (
            <button key={a.key} onClick={() => setSelectedAsset(a.key)} style={{
              padding: "5px 10px", fontSize: 8, letterSpacing: 1.5, fontFamily: "monospace", fontWeight: 700,
              cursor: "pointer", borderRadius: 3, transition: "all 0.15s",
              border: selectedAsset === a.key ? `1px solid ${a.color}66` : "1px solid #222",
              background: selectedAsset === a.key ? `${a.color}15` : "transparent",
              color: selectedAsset === a.key ? a.color : "#666",
            }}>{a.label}</button>
          ))}
          {priceInfo && (
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontSize: 20, fontWeight: 700, fontFamily: "monospace", color: "#fff", letterSpacing: -0.5 }}>
                {selectedAsset === "BTC" ? "$" + priceInfo.price.toLocaleString() : "$" + priceInfo.price.toFixed(2)}
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", color: priceInfo.isUp ? "#2A9D3A" : "#FF3B30" }}>
                {priceInfo.isUp ? "+" : ""}{priceInfo.change.toFixed(2)} ({priceInfo.isUp ? "+" : ""}{priceInfo.changePct.toFixed(1)}%)
              </span>
            </div>
          )}
        </div>

        {/* Timeframe tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 8, borderBottom: "1px solid #1a1a2a" }}>
          {TIMEFRAMES.map(tf => (
            <button key={tf} onClick={() => setTimeframe(tf)} style={{
              padding: "7px 16px", fontSize: 9, letterSpacing: 1, fontFamily: "monospace", fontWeight: 700,
              cursor: "pointer", border: "none", transition: "all 0.15s",
              borderBottom: timeframe === tf ? "2px solid #FF3B30" : "2px solid transparent",
              background: timeframe === tf ? "rgba(255,59,48,0.06)" : "transparent",
              color: timeframe === tf ? "#fff" : "#555",
            }}>{tf}</button>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, paddingRight: 4 }}>
            {timeframe === "1m" && <span style={{ fontSize: 7, color: "#FF3B30", fontFamily: "monospace", opacity: 0.6 }}>LAST 7 DAYS ONLY</span>}
            <span style={{ fontSize: 7, color: "#333", fontFamily: "monospace", letterSpacing: 1 }}>YAHOO FINANCE · REAL DATA</span>
          </div>
        </div>

        {/* Chart */}
        <div style={{ position: "relative" }}>
          <div ref={chartContainerRef} style={{ border: "1px solid #1a1a2a", borderRadius: 4, overflow: "hidden", minHeight: 460 }} />
          {loading && (
            <div style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(6,6,16,0.9)", zIndex: 2,
            }}>
              <span style={{ fontSize: 10, color: "#FF3B30", fontFamily: "monospace", letterSpacing: 2 }}>LOADING {timeframe} DATA...</span>
            </div>
          )}
        </div>

        {/* War events strip */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 8px", marginTop: 8, padding: "6px 0", borderBottom: "1px solid #111" }}>
          {WAR_EVENTS.map((evt, i) => (
            <span key={i} style={{ fontSize: 7, fontFamily: "monospace", color: "#444", letterSpacing: 0.5, whiteSpace: "nowrap" }}>
              <span style={{ color: "rgba(255,59,48,0.4)" }}>{evt.short}</span>
              <span style={{ color: "#333", marginLeft: 3 }}>{new Date(evt.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
              {i < WAR_EVENTS.length - 1 && <span style={{ color: "#222", margin: "0 2px" }}>/</span>}
            </span>
          ))}
        </div>

        {/* Tweet cards (daily only) */}
        {timeframe === "1D" && (
          <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 8, maxHeight: 340, overflowY: "auto" }}>
            {tweetData.filter(tw => tw.assetTags.includes(selectedAsset)).map(tw => {
              const color = ASSETS.find(a => a.key === selectedAsset)?.color || "#888";
              const isActive = activeTweet === tw.id;
              return (
                <div key={tw.id}
                  onMouseEnter={() => setHoveredTweet(tw.id)} onMouseLeave={() => setHoveredTweet(null)}
                  onClick={() => setSelectedTweet(selectedTweet === tw.id ? null : tw.id)}
                  style={{
                    background: isActive ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.015)",
                    border: `1px solid ${isActive ? color + "44" : "#1a1a2a"}`,
                    borderRadius: 4, padding: "10px 12px", cursor: "pointer", transition: "all 0.2s", position: "relative", overflow: "hidden",
                  }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color, opacity: isActive ? 0.8 : 0.3 }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ fontSize: 9, fontWeight: 700, color: "#fff", fontFamily: "monospace" }}>{tw.author}</span>
                      {tw.isVerified && <span style={{ fontSize: 7, color }}>&#10003;</span>}
                    </div>
                    <span style={{ fontSize: 7, color: "#666", fontFamily: "monospace" }}>{new Date(tw.datetime).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </div>
                  {tw.handle && <div style={{ fontSize: 7, color: "#555", fontFamily: "monospace", marginBottom: 5 }}>{tw.handle}</div>}
                  <div style={{ fontSize: 10, color: "#bbb", lineHeight: 1.5, marginBottom: 7, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{tw.text}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 3 }}>
                      {tw.assetTags.slice(0, 3).map(tag => {
                        const tc = ASSETS.find(a => a.key === tag)?.color || "#888";
                        return <span key={tag} style={{ fontSize: 6, fontFamily: "monospace", letterSpacing: 1, color: tc, padding: "1px 3px", border: `1px solid ${tc}33`, borderRadius: 2 }}>{tag}</span>;
                      })}
                    </div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      {tw.views && <span style={{ fontSize: 6, color: "#666", fontFamily: "monospace" }}>{tw.views}</span>}
                      {tw.url && <a href={tw.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: 7, color: "#FF3B30", fontFamily: "monospace", fontWeight: 700, letterSpacing: 1, textDecoration: "none" }}>SOURCE &#8599;</a>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, padding: "6px 0", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 7, color: "#333", fontFamily: "monospace", letterSpacing: 2 }}>OHLC CANDLES · {candleData.length.toLocaleString()} DATA POINTS · {timeframe} INTERVAL</span>
          <span style={{ fontSize: 7, color: "#333", fontFamily: "monospace", letterSpacing: 2 }}>CLICK ASSET TO SWITCH · MARKERS ON DAILY VIEW</span>
        </div>
      </div>
    </div>
  );
}
