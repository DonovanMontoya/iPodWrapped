import type { ScrobbleEntry } from '../parser/types';
import type { RankedItem, RankedAlbumItem, RankedTrackItem } from './types';

function topN<T>(map: Map<string, { count: number; data: T }>, n: number): (T & { count: number })[] {
	return [...map.values()]
		.sort((a, b) => b.count - a.count)
		.slice(0, n)
		.map(({ count, data }) => ({ ...data, count }));
}

export function computeTopArtists(entries: ScrobbleEntry[], n = 10): RankedItem[] {
	const counts = new Map<string, { count: number; data: { name: string } }>();
	for (const e of entries) {
		if (e.rating !== 'L') continue;
		const existing = counts.get(e.artist);
		if (existing) existing.count++;
		else counts.set(e.artist, { count: 1, data: { name: e.artist } });
	}
	return topN(counts, n);
}

export function computeTopAlbums(entries: ScrobbleEntry[], n = 10): RankedAlbumItem[] {
	const counts = new Map<string, { count: number; data: { album: string; artist: string } }>();
	for (const e of entries) {
		if (e.rating !== 'L') continue;
		const key = `${e.artist}\t${e.album}`;
		const existing = counts.get(key);
		if (existing) existing.count++;
		else counts.set(key, { count: 1, data: { album: e.album, artist: e.artist } });
	}
	return topN(counts, n);
}

export function computeTopTracks(entries: ScrobbleEntry[], n = 10): RankedTrackItem[] {
	const counts = new Map<string, { count: number; data: { track: string; artist: string; album: string } }>();
	for (const e of entries) {
		if (e.rating !== 'L') continue;
		const key = `${e.artist}\t${e.album}\t${e.track}`;
		const existing = counts.get(key);
		if (existing) existing.count++;
		else counts.set(key, { count: 1, data: { track: e.track, artist: e.artist, album: e.album } });
	}
	return topN(counts, n);
}
