<script lang="ts">
	import IntroSlide from './slides/IntroSlide.svelte';
	import TotalStatsSlide from './slides/TotalStatsSlide.svelte';
	import TopArtistsSlide from './slides/TopArtistsSlide.svelte';
	import TopAlbumsSlide from './slides/TopAlbumsSlide.svelte';
	import TopTracksSlide from './slides/TopTracksSlide.svelte';
	import ListeningClockSlide from './slides/ListeningClockSlide.svelte';
	import WeekdaySlide from './slides/WeekdaySlide.svelte';
	import StreakSlide from './slides/StreakSlide.svelte';
	import SkippedSlide from './slides/SkippedSlide.svelte';
	import DeepCutsSlide from './slides/DeepCutsSlide.svelte';
	import MonthlySlide from './slides/MonthlySlide.svelte';
	import FirstLastSlide from './slides/FirstLastSlide.svelte';
	import OutroSlide from './slides/OutroSlide.svelte';

	let { slideId, data }: { slideId: string; data: Record<string, unknown> } = $props();

	// Type-safe cast helper
	function d<T>(): T {
		return data as unknown as T;
	}
</script>

<div class="w-full max-w-lg mx-auto">
	{#if slideId === 'intro'}
		{@const props = d<{ periodStart: Date; periodEnd: Date }>()}
		<IntroSlide {...props} />
	{:else if slideId === 'total-stats'}
		{@const props = d<{ totalPlayed: number; totalSkipped: number; totalListeningSeconds: number; totalDays: number }>()}
		<TotalStatsSlide {...props} />
	{:else if slideId === 'top-artists'}
		{@const props = d<{ items: import('$lib/stats/types').RankedItem[] }>()}
		<TopArtistsSlide {...props} />
	{:else if slideId === 'top-albums'}
		{@const props = d<{ items: import('$lib/stats/types').RankedAlbumItem[] }>()}
		<TopAlbumsSlide {...props} />
	{:else if slideId === 'top-tracks'}
		{@const props = d<{ items: import('$lib/stats/types').RankedTrackItem[] }>()}
		<TopTracksSlide {...props} />
	{:else if slideId === 'listening-clock'}
		{@const props = d<{ hourlyDistribution: number[] }>()}
		<ListeningClockSlide {...props} />
	{:else if slideId === 'weekday'}
		{@const props = d<{ dayOfWeekDistribution: number[] }>()}
		<WeekdaySlide {...props} />
	{:else if slideId === 'streak'}
		{@const props = d<{ streak: import('$lib/stats/types').StreakInfo }>()}
		<StreakSlide {...props} />
	{:else if slideId === 'skipped'}
		{@const props = d<{ artists: import('$lib/stats/types').RankedItem[]; totalSkipped: number }>()}
		<SkippedSlide {...props} />
	{:else if slideId === 'deep-cuts'}
		{@const props = d<{ uniqueTracksCount: number; singlePlayTracks: number; heavyRotationTracks: import('$lib/stats/types').RankedTrackItem[]; repeatRatio: number }>()}
		<DeepCutsSlide {...props} />
	{:else if slideId === 'monthly'}
		{@const props = d<{ months: import('$lib/stats/types').MonthlyTopArtist[] }>()}
		<MonthlySlide {...props} />
	{:else if slideId === 'first-last'}
		{@const props = d<{ firstTrack: import('$lib/parser/types').ScrobbleEntry; lastTrack: import('$lib/parser/types').ScrobbleEntry }>()}
		<FirstLastSlide {...props} />
	{:else if slideId === 'outro'}
		{@const props = d<{ totalPlayed: number; topArtist: string; totalListeningSeconds: number }>()}
		<OutroSlide {...props} />
	{/if}
</div>
