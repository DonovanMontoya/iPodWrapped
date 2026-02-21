import type { SlideConfig } from './types';

export const SLIDE_REGISTRY: SlideConfig[] = [
	{
		id: 'intro',
		title: 'Your iPod Wrapped',
		exportable: false,
		condition: () => true,
		getData: (stats) => ({ periodStart: stats.periodStart, periodEnd: stats.periodEnd }),
		gradient: ['#1a1a2e', '#16213e']
	},
	{
		id: 'total-stats',
		title: 'By The Numbers',
		exportable: true,
		condition: (stats) => stats.totalPlayed > 0,
		getData: (stats) => ({
			totalPlayed: stats.totalPlayed,
			totalSkipped: stats.totalSkipped,
			totalListeningSeconds: stats.totalListeningSeconds,
			totalDays: stats.totalDays
		}),
		gradient: ['#0f3460', '#533483']
	},
	{
		id: 'top-artists',
		title: 'Top Artists',
		exportable: true,
		condition: (stats) => stats.topArtists.length > 0,
		getData: (stats) => ({ items: stats.topArtists.slice(0, 5) }),
		gradient: ['#1a0a2e', '#a855f7']
	},
	{
		id: 'top-albums',
		title: 'Top Albums',
		exportable: true,
		condition: (stats) => stats.topAlbums.length > 0,
		getData: (stats) => ({ items: stats.topAlbums.slice(0, 5) }),
		gradient: ['#0a1628', '#3b82f6']
	},
	{
		id: 'top-tracks',
		title: 'Top Tracks',
		exportable: true,
		condition: (stats) => stats.topTracks.length > 0,
		getData: (stats) => ({ items: stats.topTracks.slice(0, 5) }),
		gradient: ['#1a0a1e', '#ec4899']
	},
	{
		id: 'listening-clock',
		title: 'Your Listening Clock',
		exportable: true,
		condition: (stats) => stats.totalPlayed >= 10,
		getData: (stats) => ({ hourlyDistribution: stats.hourlyDistribution }),
		gradient: ['#0a1a2e', '#06b6d4']
	},
	{
		id: 'weekday',
		title: 'Day of the Week',
		exportable: true,
		condition: (stats) => stats.totalPlayed >= 10,
		getData: (stats) => ({ dayOfWeekDistribution: stats.dayOfWeekDistribution }),
		gradient: ['#1a1a0a', '#eab308']
	},
	{
		id: 'streak',
		title: 'Listening Streak',
		exportable: true,
		condition: (stats) => stats.longestStreak.days > 1,
		getData: (stats) => ({ streak: stats.longestStreak }),
		gradient: ['#0a2e1a', '#10b981']
	},
	{
		id: 'skipped',
		title: 'Most Skipped',
		exportable: true,
		condition: (stats) => stats.totalSkipped > 0,
		getData: (stats) => ({
			artists: stats.mostSkippedArtists.slice(0, 5),
			totalSkipped: stats.totalSkipped
		}),
		gradient: ['#2e0a0a', '#ef4444']
	},
	{
		id: 'deep-cuts',
		title: 'Deep Cuts',
		exportable: true,
		condition: (stats) => stats.uniqueTracksCount >= 5,
		getData: (stats) => ({
			uniqueTracksCount: stats.uniqueTracksCount,
			singlePlayTracks: stats.singlePlayTracks,
			heavyRotationTracks: stats.heavyRotationTracks.slice(0, 5),
			repeatRatio: stats.repeatRatio
		}),
		gradient: ['#1a0a2e', '#8b5cf6']
	},
	{
		id: 'monthly',
		title: 'Month by Month',
		exportable: true,
		condition: (stats) => stats.monthlyTopArtist.length >= 2,
		getData: (stats) => ({ months: stats.monthlyTopArtist }),
		gradient: ['#0a1a2e', '#6366f1']
	},
	{
		id: 'first-last',
		title: 'First & Last',
		exportable: true,
		condition: (stats) => stats.firstTrack != null,
		getData: (stats) => ({ firstTrack: stats.firstTrack, lastTrack: stats.lastTrack }),
		gradient: ['#1e0a2e', '#d946ef']
	},
	{
		id: 'outro',
		title: 'Your Wrapped',
		exportable: false,
		condition: () => true,
		getData: (stats) => ({
			totalPlayed: stats.totalPlayed,
			topArtist: stats.topArtists[0]?.name ?? 'Unknown',
			totalListeningSeconds: stats.totalListeningSeconds
		}),
		gradient: ['#0a0a1e', '#a855f7']
	}
];
