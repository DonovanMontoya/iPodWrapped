import type { ScrobbleEntry } from '../parser/types';
import type { WrappedStats } from './types';
import { computeTopArtists, computeTopAlbums, computeTopTracks } from './top-items';
import { computeHourlyDistribution, computeDayOfWeekDistribution, computeMonthlyTopArtist } from './time-patterns';
import { computeLongestStreak } from './streaks';
import { computeDeepCuts } from './deep-cuts';
import { computeMostSkippedArtists, computeMostSkippedAlbums } from './skip-analysis';

export function aggregateAll(entries: ScrobbleEntry[]): WrappedStats {
	const listened = entries.filter(e => e.rating === 'L');
	const skipped = entries.filter(e => e.rating === 'S');

	const totalListeningSeconds = listened.reduce((sum, e) => sum + e.duration, 0);

	const periodStart = entries[0]?.date ?? new Date();
	const periodEnd = entries[entries.length - 1]?.date ?? new Date();
	const totalDays = Math.max(1, Math.ceil((periodEnd.getTime() - periodStart.getTime()) / (1000 * 60 * 60 * 24)) + 1);

	const deepCuts = computeDeepCuts(entries);

	return {
		periodStart,
		periodEnd,
		totalDays,
		totalPlayed: listened.length,
		totalSkipped: skipped.length,
		totalListeningSeconds,
		topArtists: computeTopArtists(entries),
		topAlbums: computeTopAlbums(entries),
		topTracks: computeTopTracks(entries),
		mostSkippedArtists: computeMostSkippedArtists(entries),
		mostSkippedAlbums: computeMostSkippedAlbums(entries),
		hourlyDistribution: computeHourlyDistribution(entries),
		dayOfWeekDistribution: computeDayOfWeekDistribution(entries),
		monthlyTopArtist: computeMonthlyTopArtist(entries),
		longestStreak: computeLongestStreak(entries),
		firstTrack: entries[0] ?? null!,
		lastTrack: entries[entries.length - 1] ?? null!,
		uniqueTracksCount: deepCuts.uniqueTracksCount,
		singlePlayTracks: deepCuts.singlePlayTracks,
		heavyRotationTracks: deepCuts.heavyRotationTracks,
		repeatRatio: deepCuts.repeatRatio
	};
}
