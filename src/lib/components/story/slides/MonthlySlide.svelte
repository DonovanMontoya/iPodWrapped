<script lang="ts">
	import type { MonthlyTopArtist } from '$lib/stats/types';

	let { months }: { months: MonthlyTopArtist[] } = $props();

	function formatMonth(month: string): string {
		const [year, m] = month.split('-');
		const date = new Date(parseInt(year), parseInt(m) - 1);
		return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
	}
</script>

<div class="flex flex-col items-center gap-6">
	<div class="animate-fade-in-up text-center">
		<p class="text-sm uppercase tracking-[0.2em] text-white/40 font-medium">Your journey</p>
		<h2 class="text-3xl font-bold mt-1">Month by Month</h2>
	</div>

	<div class="animate-fade-in-up stagger-1 w-full max-w-xs space-y-1">
		{#each months as month, i}
			<div class="flex items-center gap-3 py-2 animate-fade-in-up stagger-{Math.min(i + 1, 8)}">
				<div class="w-16 text-right">
					<span class="text-xs text-white/40 font-mono">{formatMonth(month.month)}</span>
				</div>
				<div class="w-px h-6 bg-indigo-500/30"></div>
				<div class="flex-1 min-w-0">
					<p class="text-sm font-medium text-white truncate">{month.artist}</p>
					<p class="text-xs text-white/40">{month.count} plays</p>
				</div>
			</div>
		{/each}
	</div>
</div>
