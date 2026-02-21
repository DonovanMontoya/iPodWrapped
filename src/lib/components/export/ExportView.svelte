<script lang="ts">
	import { onMount } from 'svelte';
	import { wrappedStats } from '$lib/stores/wrapped-stats.svelte';
	import { getApplicableCards, renderCard, downloadDataUrl } from '$lib/export/card-renderer';
	import { exportAllCards } from '$lib/export/zip-export';
	import { appStore } from '$lib/stores/app.svelte';
	import { scrobbleData } from '$lib/stores/scrobble-data.svelte';

	let cards = $state<{ id: string; title: string; dataUrl: string }[]>([]);
	let downloadingAll = $state(false);

	onMount(() => {
		if (!wrappedStats.stats) return;
		const defs = getApplicableCards(wrappedStats.stats);
		cards = defs.map((def) => ({
			id: def.id,
			title: def.title,
			dataUrl: renderCard(def, wrappedStats.stats!)
		}));
	});

	function downloadSingle(card: { id: string; dataUrl: string }) {
		downloadDataUrl(card.dataUrl, `ipod-wrapped-${card.id}.png`);
	}

	async function shareSingle(card: { id: string; dataUrl: string }) {
		const res = await fetch(card.dataUrl);
		const blob = await res.blob();
		const file = new File([blob], `ipod-wrapped-${card.id}.png`, { type: 'image/png' });

		if (navigator.share && navigator.canShare?.({ files: [file] })) {
			try {
				await navigator.share({ files: [file], title: 'iPod Wrapped' });
				return;
			} catch {
				// User cancelled
			}
		}
		// Fallback: download
		downloadDataUrl(card.dataUrl, `ipod-wrapped-${card.id}.png`);
	}

	async function downloadAllZip() {
		downloadingAll = true;
		try {
			await exportAllCards(cards.map((c) => ({ name: c.id, dataUrl: c.dataUrl })));
		} finally {
			downloadingAll = false;
		}
	}

	function startOver() {
		scrobbleData.reset();
		wrappedStats.reset();
		appStore.reset();
	}

	function replayStory() {
		appStore.setPhase('story');
	}
</script>

<div class="min-h-screen px-4 py-12">
	<div class="max-w-5xl mx-auto">
		<div class="text-center mb-8 animate-fade-in-up">
			<h1 class="text-4xl font-bold">
				<span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
					Your Cards
				</span>
			</h1>
			<p class="text-[var(--color-text-muted)] mt-2">
				Download or share to Instagram Stories
			</p>
		</div>

		<!-- Action buttons -->
		<div class="animate-fade-in-up stagger-1 flex flex-col sm:flex-row gap-3 items-center justify-center mb-8">
			<button
				class="px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-medium hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 flex items-center gap-2"
				onclick={downloadAllZip}
				disabled={downloadingAll || cards.length === 0}
				type="button"
			>
				{#if downloadingAll}
					<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
					Generating ZIP...
				{:else}
					Download All ({cards.length} cards)
				{/if}
			</button>

			<button
				class="px-6 py-3 rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-white/20 transition-colors cursor-pointer"
				onclick={replayStory}
				type="button"
			>
				Replay Story
			</button>

			<button
				class="px-6 py-3 rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-white/20 transition-colors cursor-pointer"
				onclick={startOver}
				type="button"
			>
				Start Over
			</button>
		</div>

		<!-- Card grid — canvas-rendered PNGs -->
		<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
			{#each cards as card, i}
				<div class="animate-fade-in-up stagger-{Math.min(i + 1, 8)}">
					<div class="flex flex-col gap-2">
						<div class="rounded-2xl overflow-hidden border border-[var(--color-border)] bg-black">
							<img src={card.dataUrl} alt="{card.title}" class="w-full block" />
						</div>

						<div class="flex gap-2 justify-center items-center">
							<button
								class="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
								onclick={() => downloadSingle(card)}
								type="button"
							>
								Download
							</button>
							<span class="text-xs text-[var(--color-border)]">|</span>
							<button
								class="text-xs text-[var(--color-text-muted)] hover:text-pink-400 transition-colors cursor-pointer flex items-center gap-1"
								onclick={() => shareSingle(card)}
								type="button"
							>
								<svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
									<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
								</svg>
								Story
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
