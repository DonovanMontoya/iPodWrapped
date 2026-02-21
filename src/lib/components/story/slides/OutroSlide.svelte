<script lang="ts">
	import AnimatedNumber from '$lib/components/shared/AnimatedNumber.svelte';

	let { totalPlayed, topArtist, totalListeningSeconds }: {
		totalPlayed: number;
		topArtist: string;
		totalListeningSeconds: number;
	} = $props();

	let hours = $derived(Math.floor(totalListeningSeconds / 3600));
</script>

<div class="flex flex-col items-center text-center gap-6">
	<div class="animate-fade-in-up">
		<h2 class="text-4xl font-bold">
			That's a
			<span class="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">wrap</span>
		</h2>
	</div>

	<div class="animate-fade-in-up stagger-1 space-y-2 text-white/60">
		<p>
			<span class="text-white font-bold"><AnimatedNumber value={totalPlayed} /></span> tracks played
		</p>
		{#if hours > 0}
			<p>
				<span class="text-white font-bold"><AnimatedNumber value={hours} /></span> hours of music
			</p>
		{/if}
		<p>
			Top artist: <span class="text-white font-bold">{topArtist}</span>
		</p>
	</div>

	<div class="animate-fade-in-up stagger-2 mt-4">
		<p class="text-sm text-white/30">Tap to export your cards</p>
	</div>
</div>
