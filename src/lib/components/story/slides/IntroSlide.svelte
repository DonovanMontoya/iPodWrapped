<script lang="ts">
	let { periodStart, periodEnd }: { periodStart: Date; periodEnd: Date } = $props();

	function formatDate(d: Date | string): string {
		const date = d instanceof Date ? d : new Date(d);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	}
</script>

<div class="flex flex-col items-center text-center gap-6">
	<div class="animate-fade-in-up">
		<p class="text-sm uppercase tracking-[0.3em] text-white/40 font-medium">Your</p>
	</div>

	<h1 class="animate-fade-in-up stagger-2 text-6xl font-bold tracking-tight">
		<span class="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
			iPod
		</span>
		<br />
		<span class="text-white">Wrapped</span>
	</h1>

	<p class="animate-fade-in-up stagger-3 text-white/50 text-sm">
		{formatDate(periodStart)} &mdash; {formatDate(periodEnd)}
	</p>

	<div class="animate-fade-in-up stagger-4 mt-4">
		<p class="text-white/30 text-xs">Tap to begin</p>
	</div>
</div>
