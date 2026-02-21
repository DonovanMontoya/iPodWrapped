<script lang="ts">
	import type { RankedTrackItem } from '$lib/stats/types';
	import BarChart from '$lib/components/shared/BarChart.svelte';

	let { items }: { items: RankedTrackItem[] } = $props();

	let chartItems = $derived(
		items.map((item) => ({ label: item.track, sublabel: item.artist, value: item.count }))
	);
</script>

<div class="flex flex-col gap-6">
	<div class="animate-fade-in-up text-center">
		<p class="text-sm uppercase tracking-[0.2em] text-white/40 font-medium">Your top</p>
		<h2 class="text-3xl font-bold mt-1">Tracks</h2>
	</div>

	{#if items[0]}
		<div class="animate-fade-in-up stagger-1 text-center">
			<p class="text-4xl font-bold bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">
				{items[0].track}
			</p>
			<p class="text-white/50 mt-1">{items[0].artist} &middot; {items[0].count} plays</p>
		</div>
	{/if}

	<div class="animate-fade-in-up stagger-2">
		<BarChart items={chartItems} color="#ec4899" />
	</div>
</div>
