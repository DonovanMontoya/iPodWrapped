import type { ScrobbleEntry } from '../parser/types';
import type { RankedItem, RankedAlbumItem } from './types';

export function computeMostSkippedArtists(entries: ScrobbleEntry[], n = 10): RankedItem[] {
	const counts = new Map<string, number>();
	for (const e of entries) {
		if (e.rating !== 'S') continue;
		counts.set(e.artist, (counts.get(e.artist) || 0) + 1);
	}
	return [...counts.entries()]
		.sort((a, b) => b[1] - a[1])
		.slice(0, n)
		.map(([name, count]) => ({ name, count }));
}

export function computeMostSkippedAlbums(entries: ScrobbleEntry[], n = 10): RankedAlbumItem[] {
	const counts = new Map<string, { count: number; album: string; artist: string }>();
	for (const e of entries) {
		if (e.rating !== 'S') continue;
		const key = `${e.artist}\t${e.album}`;
		const existing = counts.get(key);
		if (existing) existing.count++;
		else counts.set(key, { count: 1, album: e.album, artist: e.artist });
	}
	return [...counts.values()]
		.sort((a, b) => b.count - a.count)
		.slice(0, n)
		.map(({ count, album, artist }) => ({ count, album, artist }));
}
