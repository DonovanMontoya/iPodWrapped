<script lang="ts">
	import { parseScrobblerLog } from '$lib/parser/scrobbler-parser';
	import { scrobbleData } from '$lib/stores/scrobble-data.svelte';
	import { wrappedStats } from '$lib/stores/wrapped-stats.svelte';
	import { appStore } from '$lib/stores/app.svelte';

	let dragging = $state(false);
	let error = $state<string | null>(null);
	let fileInput: HTMLInputElement;

	function handleFile(file: File) {
		error = null;
		file.text().then((text) => {
			const result = parseScrobblerLog(text);

			if (result.entries.length === 0) {
				error =
					result.errors.length > 0
						? `Could not parse any entries. ${result.errors.length} lines had errors. Make sure this is a Rockbox .scrobbler.log file.`
						: 'This file contains no listening data. Make sure the Scrobbler plugin is enabled in Rockbox.';
				return;
			}

			scrobbleData.load(result);
			wrappedStats.compute(result.entries);

			if (wrappedStats.error) {
				error = wrappedStats.error;
				return;
			}

			appStore.setPhase('story');
		});
	}

	function onDrop(e: DragEvent) {
		e.preventDefault();
		dragging = false;
		const file = e.dataTransfer?.files[0];
		if (file) handleFile(file);
	}

	function onDragOver(e: DragEvent) {
		e.preventDefault();
		dragging = true;
	}

	function onDragLeave() {
		dragging = false;
	}

	function onInputChange(e: Event) {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];
		if (file) handleFile(file);
	}

	function loadSample() {
		error = null;
		fetch('/example-log.txt')
			.then((r) => r.text())
			.then((text) => {
				const result = parseScrobblerLog(text);
				scrobbleData.load(result);
				wrappedStats.compute(result.entries);
				appStore.setPhase('story');
			});
	}
</script>

<div class="flex flex-col items-center gap-4">
	<button
		class="w-full max-w-md rounded-2xl border-2 border-dashed p-12 text-center transition-all cursor-pointer
			{dragging
			? 'border-purple-400 bg-purple-500/10 scale-[1.02]'
			: 'border-[var(--color-border)] hover:border-purple-500/50 hover:bg-white/[0.02]'}"
		ondrop={onDrop}
		ondragover={onDragOver}
		ondragleave={onDragLeave}
		onclick={() => fileInput.click()}
		type="button"
	>
		<div class="flex flex-col items-center gap-3">
			<svg
				class="h-12 w-12 text-[var(--color-text-muted)]"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
				/>
			</svg>
			<div>
				<p class="text-lg font-medium text-[var(--color-text)]">
					Drop your .scrobbler.log here
				</p>
				<p class="mt-1 text-sm text-[var(--color-text-muted)]">or click to browse</p>
			</div>
		</div>
	</button>

	<input bind:this={fileInput} type="file" accept=".log,.txt" class="hidden" onchange={onInputChange} />

	{#if error}
		<div class="max-w-md rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
			{error}
		</div>
	{/if}

	<button
		class="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors underline underline-offset-4 cursor-pointer"
		onclick={loadSample}
		type="button"
	>
		Try with sample data
	</button>
</div>
