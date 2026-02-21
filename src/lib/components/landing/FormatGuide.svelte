<script lang="ts">
	let expanded = $state(false);
</script>

<div class="max-w-md mx-auto">
	<button
		class="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
		onclick={() => (expanded = !expanded)}
		type="button"
	>
		<svg
			class="h-4 w-4 transition-transform {expanded ? 'rotate-90' : ''}"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
		</svg>
		Where do I find this file?
	</button>

	{#if expanded}
		<div class="mt-3 rounded-xl bg-white/[0.03] border border-[var(--color-border)] p-4 text-sm text-[var(--color-text-muted)] space-y-2">
			<p><strong class="text-[var(--color-text)]">1.</strong> Your iPod must be running <a href="https://www.rockbox.org/" target="_blank" rel="noopener" class="text-[var(--color-accent)] hover:underline">Rockbox</a> firmware.</p>
			<p><strong class="text-[var(--color-text)]">2.</strong> In Rockbox, enable the Scrobbler plugin: <span class="font-mono text-xs bg-white/5 px-1 py-0.5 rounded">Settings &gt; General &gt; Scrobbler</span></p>
			<p><strong class="text-[var(--color-text)]">3.</strong> Listen to music. The plugin logs every play.</p>
			<p><strong class="text-[var(--color-text)]">4.</strong> Connect your iPod to your computer. The file is at the root of the drive:</p>
			<p class="font-mono text-xs bg-white/5 px-2 py-1 rounded">.scrobbler.log</p>
			<p class="text-xs mt-2 opacity-70">Some setups place it in <span class="font-mono">.rockbox/.scrobbler.log</span></p>
		</div>
	{/if}
</div>
