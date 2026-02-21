import type { ScrobbleEntry } from '../parser/types';
import type { StreakInfo } from './types';

function toDateKey(date: Date): string {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function parseDate(key: string): Date {
	const [y, m, d] = key.split('-').map(Number);
	return new Date(y, m - 1, d);
}

function addDays(date: Date, n: number): Date {
	const d = new Date(date);
	d.setDate(d.getDate() + n);
	return d;
}

export function computeLongestStreak(entries: ScrobbleEntry[]): StreakInfo {
	const listenedDates = new Set<string>();
	for (const e of entries) {
		if (e.rating !== 'L') continue;
		listenedDates.add(toDateKey(e.date));
	}

	if (listenedDates.size === 0) {
		return { days: 0, startDate: new Date(), endDate: new Date() };
	}

	const sortedDates = [...listenedDates].sort();
	let bestStart = sortedDates[0];
	let bestLength = 1;
	let currentStart = sortedDates[0];
	let currentLength = 1;

	for (let i = 1; i < sortedDates.length; i++) {
		const prevDate = parseDate(sortedDates[i - 1]);
		const currDate = parseDate(sortedDates[i]);
		const expected = toDateKey(addDays(prevDate, 1));

		if (sortedDates[i] === expected) {
			currentLength++;
		} else {
			if (currentLength > bestLength) {
				bestLength = currentLength;
				bestStart = currentStart;
			}
			currentStart = sortedDates[i];
			currentLength = 1;
		}
	}

	if (currentLength > bestLength) {
		bestLength = currentLength;
		bestStart = currentStart;
	}

	const startDate = parseDate(bestStart);
	const endDate = addDays(startDate, bestLength - 1);

	return { days: bestLength, startDate, endDate };
}
