<script lang="ts">
	import type { RankedTrackItem } from '$lib/stats/types';
	import AnimatedNumber from '$lib/components/shared/AnimatedNumber.svelte';

	let { uniqueTracksCount, singlePlayTracks, heavyRotationTracks, repeatRatio }: {
		uniqueTracksCount: number;
		singlePlayTracks: number;
		heavyRotationTracks: RankedTrackItem[];
		repeatRatio: number;
	} = $props();

	let deepCutPercent = $derived(
		uniqueTracksCount > 0 ? Math.round((singlePlayTracks / uniqueTracksCount) * 100) : 0
	);
</script>

<div class="flex flex-col items-center text-center gap-6">
	<div class="animate-fade-in-up">
		<p class="text-sm uppercase tracking-[0.2em] text-white/40 font-medium">Exploration vs</p>
		<h2 class="text-3xl font-bold mt-1">Heavy Rotation</h2>
	</div>

	<div class="animate-fade-in-up stagger-1 grid grid-cols-2 gap-4 w-full max-w-xs">
		<div class="rounded-xl bg-white/5 p-4">
			<p class="text-3xl font-bold text-purple-300"><AnimatedNumber value={singlePlayTracks} /></p>
			<p class="text-xs text-white/40 mt-1">deep cuts</p>
		</div>
		<div class="rounded-xl bg-white/5 p-4">
			<p class="text-3xl font-bold text-purple-300"><AnimatedNumber value={deepCutPercent} />%</p>
			<p class="text-xs text-white/40 mt-1">played once</p>
		</div>
	</div>

	{#if heavyRotationTracks.length > 0}
		<div class="animate-fade-in-up stagger-2 w-full max-w-xs">
			<p class="text-xs uppercase tracking-wider text-white/30 mb-3">On repeat</p>
			{#each heavyRotationTracks.slice(0, 3) as track, i}
				<div class="flex items-center justify-between py-1.5 text-sm">
					<div class="text-left min-w-0 mr-3">
						<p class="text-white/80 truncate">{track.track}</p>
						<p class="text-white/40 text-xs truncate">{track.artist}</p>
					</div>
					<span class="text-purple-300 shrink-0">{track.count}x</span>
				</div>
			{/each}
		</div>
	{/if}

	<p class="animate-fade-in-up stagger-3 text-xs text-white/30">
		{uniqueTracksCount} unique tracks across all listens
	</p>
</div>
