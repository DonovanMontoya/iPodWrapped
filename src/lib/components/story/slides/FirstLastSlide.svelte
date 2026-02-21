<script lang="ts">
	import type { ScrobbleEntry } from '$lib/parser/types';

	let { firstTrack, lastTrack }: { firstTrack: ScrobbleEntry; lastTrack: ScrobbleEntry } = $props();

	function formatDate(d: Date | string): string {
		const date = d instanceof Date ? d : new Date(d);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	}
</script>

<div class="flex flex-col items-center text-center gap-8">
	<div class="animate-fade-in-up">
		<h2 class="text-3xl font-bold">First & Last</h2>
	</div>

	<div class="animate-fade-in-up stagger-1 w-full max-w-xs">
		<p class="text-xs uppercase tracking-wider text-white/30 mb-2">Where it all began</p>
		<div class="rounded-xl bg-white/5 p-4 text-left">
			<p class="font-bold text-fuchsia-300">{firstTrack.track}</p>
			<p class="text-sm text-white/50">{firstTrack.artist}</p>
			<p class="text-xs text-white/30 mt-2">{formatDate(firstTrack.date)}</p>
		</div>
	</div>

	<div class="animate-fade-in-up stagger-2 flex justify-center">
		<svg class="h-8 w-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
		</svg>
	</div>

	<div class="animate-fade-in-up stagger-3 w-full max-w-xs">
		<p class="text-xs uppercase tracking-wider text-white/30 mb-2">Most recent play</p>
		<div class="rounded-xl bg-white/5 p-4 text-left">
			<p class="font-bold text-fuchsia-300">{lastTrack.track}</p>
			<p class="text-sm text-white/50">{lastTrack.artist}</p>
			<p class="text-xs text-white/30 mt-2">{formatDate(lastTrack.date)}</p>
		</div>
	</div>
</div>
