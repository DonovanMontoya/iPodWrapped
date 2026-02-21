<script lang="ts">
	import { exportAllCards } from '$lib/export/zip-export';
	import { appStore } from '$lib/stores/app.svelte';
	import { scrobbleData } from '$lib/stores/scrobble-data.svelte';
	import { wrappedStats } from '$lib/stores/wrapped-stats.svelte';

	let { cards }: { cards: { name: string; dataUrl: string }[] } = $props();
	let downloading = $state(false);

	async function downloadAll() {
		downloading = true;
		try {
			await exportAllCards(cards);
		} finally {
			downloading = false;
		}
	}

	function startOver() {
		scrobbleData.reset();
		wrappedStats.reset();
		appStore.reset();
	}
</script>

<div class="flex flex-col sm:flex-row gap-3 items-center justify-center">
	<button
		class="px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-medium hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
		onclick={downloadAll}
		disabled={downloading || cards.length === 0}
		type="button"
	>
		{downloading ? 'Zipping...' : `Download All (${cards.length} cards)`}
	</button>

	<button
		class="px-6 py-3 rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-white/20 transition-colors cursor-pointer"
		onclick={startOver}
		type="button"
	>
		Start Over
	</button>
</div>
