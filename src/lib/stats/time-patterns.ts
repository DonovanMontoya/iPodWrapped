import type { ScrobbleEntry } from '../parser/types';
import type { MonthlyTopArtist } from './types';

export function computeHourlyDistribution(entries: ScrobbleEntry[]): number[] {
	const hours = new Array(24).fill(0);
	for (const e of entries) {
		if (e.rating !== 'L') continue;
		hours[e.date.getHours()]++;
	}
	return hours;
}

export function computeDayOfWeekDistribution(entries: ScrobbleEntry[]): number[] {
	const days = new Array(7).fill(0);
	for (const e of entries) {
		if (e.rating !== 'L') continue;
		days[e.date.getDay()]++;
	}
	return days;
}

export function computeMonthlyTopArtist(entries: ScrobbleEntry[]): MonthlyTopArtist[] {
	const monthArtists = new Map<string, Map<string, number>>();

	for (const e of entries) {
		if (e.rating !== 'L') continue;
		const month = `${e.date.getFullYear()}-${String(e.date.getMonth() + 1).padStart(2, '0')}`;
		if (!monthArtists.has(month)) {
			monthArtists.set(month, new Map());
		}
		const artists = monthArtists.get(month)!;
		artists.set(e.artist, (artists.get(e.artist) || 0) + 1);
	}

	const result: MonthlyTopArtist[] = [];
	const sortedMonths = [...monthArtists.keys()].sort();

	for (const month of sortedMonths) {
		const artists = monthArtists.get(month)!;
		let topArtist = '';
		let topCount = 0;
		for (const [artist, count] of artists) {
			if (count > topCount) {
				topArtist = artist;
				topCount = count;
			}
		}
		result.push({ month, artist: topArtist, count: topCount });
	}

	return result;
}
