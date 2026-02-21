import type { ScrobbleEntry, ParseResult, ParseError } from './types';

export function parseScrobblerLog(raw: string): ParseResult {
	const lines = raw.split('\n');
	const entries: ScrobbleEntry[] = [];
	const errors: ParseError[] = [];
	let headerVersion: string | null = null;
	let skippedLines = 0;

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();

		if (!line) {
			skippedLines++;
			continue;
		}

		if (line.startsWith('#')) {
			skippedLines++;
			const versionMatch = line.match(/^#AUDIOSCROBBLER\/(\d+\.\d+)/);
			if (versionMatch) {
				headerVersion = versionMatch[1];
			}
			continue;
		}

		const fields = line.split('\t');

		if (fields.length < 7) {
			errors.push({ line: i + 1, content: line, reason: `Expected 7 tab-separated fields, got ${fields.length}` });
			continue;
		}

		const artist = fields[0].trim() || 'Unknown Artist';
		const album = fields[1].trim() || 'Unknown Album';
		const track = fields[2].trim() || 'Unknown Track';
		const trackNumber = parseInt(fields[3], 10);
		const duration = parseInt(fields[4], 10);
		const rating = fields[5].trim().toUpperCase();
		const timestamp = parseInt(fields[6], 10);

		if (rating !== 'L' && rating !== 'S') {
			errors.push({ line: i + 1, content: line, reason: `Invalid rating "${fields[5]}", expected "L" or "S"` });
			continue;
		}

		if (isNaN(duration) || duration <= 0) {
			errors.push({ line: i + 1, content: line, reason: `Invalid duration "${fields[4]}"` });
			continue;
		}

		if (isNaN(timestamp) || timestamp <= 0) {
			errors.push({ line: i + 1, content: line, reason: `Invalid timestamp "${fields[6]}"` });
			continue;
		}

		entries.push({
			artist,
			album,
			track,
			trackNumber: isNaN(trackNumber) ? 0 : trackNumber,
			duration,
			rating: rating as 'L' | 'S',
			timestamp,
			date: new Date(timestamp * 1000)
		});
	}

	// Sort by timestamp ascending
	entries.sort((a, b) => a.timestamp - b.timestamp);

	// Deduplicate on (artist, track, timestamp)
	const seen = new Set<string>();
	const deduplicated: ScrobbleEntry[] = [];
	for (const entry of entries) {
		const key = `${entry.artist}\t${entry.track}\t${entry.timestamp}`;
		if (!seen.has(key)) {
			seen.add(key);
			deduplicated.push(entry);
		}
	}

	return {
		entries: deduplicated,
		totalLines: lines.length,
		skippedLines,
		errors,
		headerVersion
	};
}
