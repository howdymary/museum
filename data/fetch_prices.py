#!/usr/bin/env python3
"""
Fetch daily close prices for war-impact assets using yfinance.
Outputs data/prices.json as: [{ asset, date, close }]

Tickers:
  CL=F     WTI Crude Oil Futures
  BZ=F     Brent Crude Oil Futures
  GC=F     Gold Futures
  BTC-USD  Bitcoin
  MAGS     Roundhill Magnificent Seven ETF

Date range: 2026-02-27 (day before Operation Epic Fury) to today.
"""

import json
import sys
from datetime import date, timedelta
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
# yfinance end is exclusive, so add 1 day
END = (date.today() + timedelta(days=1)).isoformat()

OUTPUT = Path(__file__).parent / "prices.json"


def main():
    records = []
    failed = []

    for ticker, label in TICKERS.items():
        print(f"Fetching {ticker} ({label})...", end=" ")
        try:
            df = yf.download(ticker, start=START, end=END, progress=False, auto_adjust=True)
            if df.empty:
                print("NO DATA")
                failed.append(ticker)
                continue

            # Handle multi-level columns from yfinance
            if hasattr(df.columns, 'levels') and len(df.columns.levels) > 1:
                df.columns = df.columns.get_level_values(0)

            for dt, row in df.iterrows():
                close = row["Close"]
                if close is not None and close == close:  # not NaN
                    records.append({
                        "asset": label,
                        "date": dt.strftime("%Y-%m-%d"),
                        "close": round(float(close), 2),
                    })
            print(f"{len(df)} rows")
        except Exception as e:
            print(f"FAILED: {e}")
            failed.append(ticker)

    if failed:
        print(f"\nWARNING: Could not fetch: {', '.join(failed)}")
        print("You may need to supply a CSV for these tickers.")

    # Sort by asset then date
    records.sort(key=lambda r: (r["asset"], r["date"]))

    OUTPUT.write_text(json.dumps(records, indent=2))
    print(f"\nWrote {len(records)} records to {OUTPUT}")


if __name__ == "__main__":
    main()
