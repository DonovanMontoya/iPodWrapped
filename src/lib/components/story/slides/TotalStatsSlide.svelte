<script lang="ts">
	import AnimatedNumber from '$lib/components/shared/AnimatedNumber.svelte';

	let { totalPlayed, totalSkipped, totalListeningSeconds, totalDays }: {
		totalPlayed: number;
		totalSkipped: number;
		totalListeningSeconds: number;
		totalDays: number;
	} = $props();

	let hours = $derived(Math.floor(totalListeningSeconds / 3600));
	let minutes = $derived(Math.floor((totalListeningSeconds % 3600) / 60));
</script>

<div class="flex flex-col items-center text-center gap-8">
	<p class="animate-fade-in-up text-sm uppercase tracking-[0.2em] text-white/40 font-medium">By the numbers</p>

	<div class="animate-fade-in-up stagger-1">
		<p class="text-6xl font-bold text-white">
			<AnimatedNumber value={totalPlayed} />
		</p>
		<p class="text-white/50 mt-1">tracks played</p>
	</div>

	<div class="animate-fade-in-up stagger-2">
		<p class="text-4xl font-bold text-white">
			{#if hours > 0}
				<AnimatedNumber value={hours} />h
			{/if}
			<AnimatedNumber value={minutes} />m
		</p>
		<p class="text-white/50 mt-1">of listening</p>
	</div>

	<div class="grid grid-cols-2 gap-6 animate-fade-in-up stagger-3">
		<div>
			<p class="text-2xl font-bold text-white"><AnimatedNumber value={totalSkipped} /></p>
			<p class="text-white/50 text-sm">skipped</p>
		</div>
		<div>
			<p class="text-2xl font-bold text-white"><AnimatedNumber value={totalDays} /></p>
			<p class="text-white/50 text-sm">days tracked</p>
		</div>
	</div>
</div>
