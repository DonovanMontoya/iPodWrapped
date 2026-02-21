<script lang="ts">
	import type { StreakInfo } from '$lib/stats/types';
	import AnimatedNumber from '$lib/components/shared/AnimatedNumber.svelte';

	let { streak }: { streak: StreakInfo } = $props();

	function formatDate(d: Date | string): string {
		const date = d instanceof Date ? d : new Date(d);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}
</script>

<div class="flex flex-col items-center text-center gap-6">
	<div class="animate-fade-in-up">
		<p class="text-sm uppercase tracking-[0.2em] text-white/40 font-medium">Longest</p>
		<h2 class="text-3xl font-bold mt-1">Listening Streak</h2>
	</div>

	<div class="animate-fade-in-up stagger-1">
		<p class="text-7xl font-bold bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
			<AnimatedNumber value={streak.days} />
		</p>
		<p class="text-xl text-white/60 mt-1">consecutive days</p>
	</div>

	<div class="animate-fade-in-up stagger-2 text-sm text-white/40">
		<p>{formatDate(streak.startDate)} &mdash; {formatDate(streak.endDate)}</p>
	</div>
</div>
