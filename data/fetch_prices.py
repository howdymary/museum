#!/usr/bin/env python3
"""
Fetch OHLC candle data for war-impact assets using yfinance.

Outputs:
  data/ohlc_1d.json   — daily candles (full range)
  data/ohlc_15m.json  — 15-minute candles (full range, within 60-day limit)
  data/ohlc_5m.json   — 5-minute candles (full range, within 60-day limit)
  data/ohlc_1m.json   — 1-minute candles (last 7 days only — yfinance limit)

Also outputs data/prices.json (daily close, normalized) for backward compat.

Schema: [{ asset, time, open, high, low, close }]
  - time is ISO date for 1d, or Unix timestamp for intraday
"""

import json
import sys
from datetime import date, timedelta, datetime
from pathlib import Path

try:
    import yfinance as yf
except ImportError:
    print("ERROR: yfinance not installed. Run: pip install yfinance", file=sys.stderr)
    sys.exit(1)

TICKERS = {
    "CL=F":    "WTI",
    "BZ=F":    "Brent",
    "GC=F":    "Gold",
    "BTC-USD": "BTC",
    "MAGS":    "MAGS",
}

START = "2026-02-27"
END = (date.today() + timedelta(days=1)).isoformat()

# For 1m data, yfinance only allows last 7 days
START_1M = (date.today() - timedelta(days=6)).isoformat()

DATA_DIR = Path(__file__).parent

INTERVALS = [
    ("1d",  START, END, "ohlc_1d.json"),
    ("15m", START, END, "ohlc_15m.json"),
    ("5m",  START, END, "ohlc_5m.json"),
    ("1m",  START_1M, END, "ohlc_1m.json"),
]


def fetch_interval(interval, start, end, filename):
    records = []
    failed = []

    for ticker, label in TICKERS.items():
        print(f"  {ticker} ({label})...", end=" ")
        try:
            df = yf.download(
                ticker, start=start, end=end,
                interval=interval, progress=False, auto_adjust=True
            )
            if df.empty:
                print("NO DATA")
                failed.append(ticker)
                continue

            # Handle multi-level columns
            if hasattr(df.columns, 'levels') and len(df.columns.levels) > 1:
                df.columns = df.columns.get_level_values(0)

            for dt, row in df.iterrows():
                o, h, l, c = row.get("Open"), row.get("High"), row.get("Low"), row.get("Close")
                if c is None or c != c:
                    continue

                if interval == "1d":
                    time_val = dt.strftime("%Y-%m-%d")
                else:
                    time_val = int(dt.timestamp())

                records.append({
                    "asset": label,
                    "time": time_val,
                    "open": round(float(o), 2) if o == o else round(float(c), 2),
                    "high": round(float(h), 2) if h == h else round(float(c), 2),
                    "low": round(float(l), 2) if l == l else round(float(c), 2),
                    "close": round(float(c), 2),
                })
            print(f"{len(df)} candles")
        except Exception as e:
            print(f"FAILED: {e}")
            failed.append(ticker)

    if failed:
        print(f"  WARNING: Could not fetch: {', '.join(failed)}")

    records.sort(key=lambda r: (r["asset"], r["time"]))
    out = DATA_DIR / filename
    out.write_text(json.dumps(records, indent=2))
    print(f"  -> {len(records)} records to {out}")
    return records


def main():
    all_daily = []
    for interval, start, end, filename in INTERVALS:
        print(f"\n[{interval}] Fetching {start} to {end}...")
        recs = fetch_interval(interval, start, end, filename)
        if interval == "1d":
            all_daily = recs

    # Also write backward-compat prices.json (daily close only)
    if all_daily:
        prices = []
        for r in all_daily:
            prices.append({
                "asset": r["asset"],
                "date": r["time"],
                "close": r["close"],
            })
        out = DATA_DIR / "prices.json"
        out.write_text(json.dumps(prices, indent=2))
        print(f"\nBackward-compat: {len(prices)} records to {out}")

    print("\nDone.")


if __name__ == "__main__":
    main()
