# iPod Wrapped

iPod Wrapped turns a Rockbox `.scrobbler.log` file into a shareable wrapped-style story and downloadable Story cards.

Everything runs client-side in the browser. Your listening data does not get uploaded.

## What it does

- Parses Rockbox Audioscrobbler logs (`L` listened + `S` skipped rows)
- Computes listening stats (top artists/albums/tracks, streaks, time patterns, deep cuts)
- Renders an in-app story flow with conditional slides
- Exports 1080x1920 PNG cards and a ZIP bundle for sharing

## Input format

Expected file: `.scrobbler.log` from Rockbox.

Common locations:

- iPod root: `.scrobbler.log`
- Alternate: `.rockbox/.scrobbler.log`

Each data row is tab-separated and has 7 fields:

`artist	album	track	trackNumber	durationSeconds	rating(L|S)	unixTimestamp`

See `static/README.md` and `static/example-log.txt` for details.

## Local development

Prerequisites:

- Node.js 20+ (recommended)
- npm or Bun

Install:

```sh
npm install
# or
bun install
```

Run dev server:

```sh
npm run dev
# or
bun run dev
```

Type checking:

```sh
npm run check
```

Build + preview:

```sh
npm run build
npm run preview
```

## Scripts

- `dev`: start Vite dev server
- `build`: production build (SvelteKit static adapter)
- `preview`: preview built output locally
- `check`: sync SvelteKit types + run `svelte-check`
- `check:watch`: same as `check`, watch mode

## Project docs

- `src/lib/README.md`: architecture and data flow
- `static/README.md`: sample log file and field reference
