import type { ScrobbleEntry } from '../parser/types';
import type { RankedTrackItem } from './types';

export interface DeepCutStats {
	uniqueTracksCount: number;
	singlePlayTracks: number;
	heavyRotationTracks: RankedTrackItem[];
	repeatRatio: number;
}

export function computeDeepCuts(entries: ScrobbleEntry[]): DeepCutStats {
	const trackCounts = new Map<string, { count: number; track: string; artist: string; album: string }>();

	let totalPlayed = 0;
	for (const e of entries) {
		if (e.rating !== 'L') continue;
		totalPlayed++;
		const key = `${e.artist}\t${e.track}`;
		const existing = trackCounts.get(key);
		if (existing) {
			existing.count++;
		} else {
			trackCounts.set(key, { count: 1, track: e.track, artist: e.artist, album: e.album });
		}
	}

	const uniqueTracksCount = trackCounts.size;
	let singlePlayTracks = 0;
	for (const { count } of trackCounts.values()) {
		if (count === 1) singlePlayTracks++;
	}

	const heavyRotationTracks = [...trackCounts.values()]
		.filter(t => t.count > 1)
		.sort((a, b) => b.count - a.count)
		.slice(0, 10)
		.map(({ count, track, artist, album }) => ({ count, track, artist, album }));

	const repeatRatio = totalPlayed > 0 ? 1 - uniqueTracksCount / totalPlayed : 0;

	return { uniqueTracksCount, singlePlayTracks, heavyRotationTracks, repeatRatio };
}
