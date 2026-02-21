<script lang="ts">
	import RadialChart from '$lib/components/shared/RadialChart.svelte';

	let { hourlyDistribution }: { hourlyDistribution: number[] } = $props();

	const hourLabels = Array.from({ length: 24 }, (_, i) => {
		if (i === 0) return '12a';
		if (i === 6) return '6a';
		if (i === 12) return '12p';
		if (i === 18) return '6p';
		return '';
	});

	let peakHour = $derived(() => {
		let max = 0;
		let hour = 0;
		for (let i = 0; i < hourlyDistribution.length; i++) {
			if (hourlyDistribution[i] > max) {
				max = hourlyDistribution[i];
				hour = i;
			}
		}
		return hour;
	});

	function formatHour(h: number): string {
		if (h === 0) return '12 AM';
		if (h < 12) return `${h} AM`;
		if (h === 12) return '12 PM';
		return `${h - 12} PM`;
	}

	let timeOfDay = $derived(() => {
		const h = peakHour();
		if (h >= 5 && h < 12) return 'morning';
		if (h >= 12 && h < 17) return 'afternoon';
		if (h >= 17 && h < 21) return 'evening';
		return 'night';
	});
</script>

<div class="flex flex-col items-center gap-6">
	<div class="animate-fade-in-up text-center">
		<p class="text-sm uppercase tracking-[0.2em] text-white/40 font-medium">When you listen</p>
		<h2 class="text-3xl font-bold mt-1">Listening Clock</h2>
	</div>

	<div class="animate-fade-in-up stagger-1">
		<RadialChart data={hourlyDistribution} labels={hourLabels} color="#06b6d4" />
	</div>

	<div class="animate-fade-in-up stagger-2 text-center">
		<p class="text-lg text-white/70">
			You're a <span class="font-bold text-white">{timeOfDay()}</span> listener
		</p>
		<p class="text-sm text-white/40 mt-1">Peak hour: {formatHour(peakHour())}</p>
	</div>

	<p class="animate-fade-in-up stagger-3 text-xs text-white/30 text-center">
		Times shown in UTC
	</p>
</div>
