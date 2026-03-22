# War on Every Screen — A Digital Museum of Asymmetric Warfare

An interactive scrollytelling experience about the March 2026 Iran war (Operation Epic Fury), combining long-form investigative journalism with 3D models, data visualizations, and a theater-of-operations map.

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/howdymary/museum)

Or manually:

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
```

Then connect the repo to Vercel. It auto-detects Vite.

## Features

- **Theater of Operations Map** — 46 sourced military events across 22 days, Natural Earth 50m country boundaries
- **3D Weapons Gallery** — FPV drone, Shahed-136, F-35A, Phantom MK-1 humanoid (Three.js, drag to rotate)
- **Side-by-Side Comparisons** — 3D renderings paired with real photographs
- **Missile Comparison** — 8 systems at relative scale, filterable by nation/cost
- **Cost Calculator** — 16 economic/military/human metrics across 5 time horizons
- **Pentagon Sankey Diagram** — $3.1B/day burn rate breakdown
- **Evolution of the Combatant** — Interactive 5-era stepper (1916–2026) with real photos
- **Broadcast Wall** — 9 media events with direct links to original sources
- **BadeSaba Notification Mockup** — Reconstructed prayer app hack
- **Compression Timeline** — Vietnam (3 days) → Iran (zero)
- **5,000+ word essay** in 6 acts with 12 embedded video/media links

## Sources

CENTCOM, Flashpoint, Hudson Institute, CSIS, Defense Update, The War Zone, Air & Space Forces Magazine, SOF News, The Aviationist, OSINTtechnical, Times of Israel, PBS/AP, Al Jazeera, CNN, Britannica, NPR, Cyabra, Time, WSJ/Wired/Schneier, Loewenstein, Fortune/EIA, Goldman Sachs, Oxford Economics, Dallas Fed, Raytheon/MDAA

## Stack

React 18 + Three.js + Vite 6. Single-file architecture. No external CSS.

## Status

DRAFT — March 2026
