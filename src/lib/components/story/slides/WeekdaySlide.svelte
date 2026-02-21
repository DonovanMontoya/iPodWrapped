<script lang="ts">
	let { dayOfWeekDistribution }: { dayOfWeekDistribution: number[] } = $props();

	const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const dayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	let maxPlays = $derived(Math.max(...dayOfWeekDistribution, 1));

	let peakDay = $derived(() => {
		let max = 0;
		let day = 0;
		for (let i = 0; i < dayOfWeekDistribution.length; i++) {
			if (dayOfWeekDistribution[i] > max) {
				max = dayOfWeekDistribution[i];
				day = i;
			}
		}
		return day;
	});
</script>

<div class="flex flex-col items-center gap-6">
	<div class="animate-fade-in-up text-center">
		<p class="text-sm uppercase tracking-[0.2em] text-white/40 font-medium">Your favourite</p>
		<h2 class="text-3xl font-bold mt-1">Day to Listen</h2>
	</div>

	<div class="animate-fade-in-up stagger-1 text-center">
		<p class="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
			{dayNames[peakDay()]}
		</p>
	</div>

	<div class="animate-fade-in-up stagger-2 flex items-end gap-2 h-32 w-full max-w-xs">
		{#each dayOfWeekDistribution as count, i}
			<div class="flex-1 flex flex-col items-center gap-1">
				<div
					class="w-full rounded-t-md transition-all duration-700"
					style="height: {(count / maxPlays) * 100}%; background: {i === peakDay() ? '#eab308' : 'rgba(234, 179, 8, 0.3)'}; min-height: 4px;"
				></div>
				<span class="text-[10px] text-white/40">{dayShort[i]}</span>
			</div>
		{/each}
	</div>
</div>
