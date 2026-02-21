<script lang="ts">
	import type { RankedItem } from '$lib/stats/types';
	import BarChart from '$lib/components/shared/BarChart.svelte';

	let { items }: { items: RankedItem[] } = $props();

	let chartItems = $derived(
		items.map((item) => ({ label: item.name, value: item.count }))
	);
</script>

<div class="flex flex-col gap-6">
	<div class="animate-fade-in-up text-center">
		<p class="text-sm uppercase tracking-[0.2em] text-white/40 font-medium">Your top</p>
		<h2 class="text-3xl font-bold mt-1">Artists</h2>
	</div>

	{#if items[0]}
		<div class="animate-fade-in-up stagger-1 text-center">
			<p class="text-5xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
				{items[0].name}
			</p>
			<p class="text-white/50 mt-1">{items[0].count} plays</p>
		</div>
	{/if}

	<div class="animate-fade-in-up stagger-2">
		<BarChart items={chartItems} color="#a855f7" />
	</div>
</div>
