# `src/lib` Architecture

This folder contains app logic, UI components, state stores, and export code.

## Data flow

1. User uploads `.scrobbler.log` in `components/landing/FileDropzone.svelte`.
2. `parser/scrobbler-parser.ts` parses rows into normalized `ScrobbleEntry[]`.
3. `stores/scrobble-data.svelte.ts` keeps raw parse result and errors.
4. `stores/wrapped-stats.svelte.ts` computes aggregate stats from parsed entries.
5. `slides/slide-builder.ts` and `slides/slide-registry.ts` build the story sequence.
6. `components/story/*` renders the interactive wrapped story.
7. `export/card-renderer.ts` generates PNG cards and `export/zip-export.ts` zips them.

## Folder guide

- `components/`: Svelte UI split by app phase
- `components/landing/`: upload + format guidance
- `components/story/`: wrapped slideshow and slide components
- `components/export/`: card previews and export actions
- `export/`: canvas card rendering and ZIP export
- `parser/`: `.scrobbler.log` parser and parse types
- `slides/`: slide registry, conditions, and story assembly
- `stats/`: aggregation and stat calculators
- `stores/`: Svelte 5 stores for app phase, input data, and computed stats

## Notes

- Parser deduplicates records by `artist + track + timestamp`.
- Ratings are interpreted as:
  - `L`: listened
  - `S`: skipped
- Exported cards are generated at 1080x1920 for Story-friendly dimensions.
