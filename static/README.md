# Static Assets And Sample Data

## Files

- `example-log.txt`: sample Rockbox scrobbler export used by the "Try with sample data" button
- `robots.txt`: crawler policy for deployments

## Rockbox `.scrobbler.log` format

Header rows may appear first and begin with `#`, for example:

- `#AUDIOSCROBBLER/1.1`
- `#TZ/UNKNOWN`
- `#CLIENT/Rockbox`

Each play/skip row is tab-separated with 7 fields:

1. Artist
2. Album
3. Track
4. Track number (integer, optional-ish)
5. Duration in seconds (integer, must be `> 0`)
6. Rating (`L` listened or `S` skipped)
7. Unix timestamp in seconds (integer, must be `> 0`)

Example row:

```txt
Radiohead	OK Computer	Paranoid Android	2	383	L	1704067200
```

## Parser behavior used by this app

- Ignores empty lines and header/comment rows (`#...`)
- Sorts rows by timestamp ascending
- Drops invalid rows and tracks parse errors with line numbers
- Deduplicates identical `artist + track + timestamp` rows
