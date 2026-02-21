<script lang="ts">
	import type { RankedItem } from '$lib/stats/types';
	import AnimatedNumber from '$lib/components/shared/AnimatedNumber.svelte';

	let { artists, totalSkipped }: { artists: RankedItem[]; totalSkipped: number } = $props();
</script>

<div class="flex flex-col items-center text-center gap-6">
	<div class="animate-fade-in-up">
		<p class="text-sm uppercase tracking-[0.2em] text-white/40 font-medium">The ones you</p>
		<h2 class="text-3xl font-bold mt-1">Skipped</h2>
	</div>

	<div class="animate-fade-in-up stagger-1">
		<p class="text-5xl font-bold text-red-400">
			<AnimatedNumber value={totalSkipped} />
		</p>
		<p class="text-white/50 mt-1">total skips</p>
	</div>

	{#if artists.length > 0}
		<div class="animate-fade-in-up stagger-2 w-full max-w-xs">
			<p class="text-xs uppercase tracking-wider text-white/30 mb-3">Most skipped artists</p>
			{#each artists as artist, i}
				<div class="flex items-center justify-between py-1.5 text-sm">
					<span class="text-white/70">{i + 1}. {artist.name}</span>
					<span class="text-red-400/70">{artist.count}</span>
				</div>
			{/each}
		</div>
	{/if}
</div>
