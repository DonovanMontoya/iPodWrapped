import type { ScrobbleEntry } from '../parser/types';

export interface WrappedStats {
	periodStart: Date;
	periodEnd: Date;
	totalDays: number;

	totalPlayed: number;
	totalSkipped: number;
	totalListeningSeconds: number;

	topArtists: RankedItem[];
	topAlbums: RankedAlbumItem[];
	topTracks: RankedTrackItem[];

	mostSkippedArtists: RankedItem[];
	mostSkippedAlbums: RankedAlbumItem[];

	hourlyDistribution: number[];
	dayOfWeekDistribution: number[];
	monthlyTopArtist: MonthlyTopArtist[];

	longestStreak: StreakInfo;

	firstTrack: ScrobbleEntry;
	lastTrack: ScrobbleEntry;

	uniqueTracksCount: number;
	singlePlayTracks: number;
	heavyRotationTracks: RankedTrackItem[];
	repeatRatio: number;
}

export interface RankedItem {
	name: string;
	count: number;
}

export interface RankedAlbumItem {
	album: string;
	artist: string;
	count: number;
}

export interface RankedTrackItem {
	track: string;
	artist: string;
	album: string;
	count: number;
}

export interface MonthlyTopArtist {
	month: string;
	artist: string;
	count: number;
}

export interface StreakInfo {
	days: number;
	startDate: Date;
	endDate: Date;
}
