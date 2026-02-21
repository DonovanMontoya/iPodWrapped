<script lang="ts">
	import FileDropzone from './FileDropzone.svelte';
	import FormatGuide from './FormatGuide.svelte';
</script>

<div class="min-h-screen flex flex-col items-center justify-center px-4 py-16">
	<div class="flex flex-col items-center gap-8 max-w-lg text-center">
		<div class="animate-fade-in-up">
			<h1 class="text-5xl font-bold tracking-tight">
				<span class="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
					iPod Wrapped
				</span>
			</h1>
			<p class="mt-3 text-lg text-[var(--color-text-muted)]">
				Your Rockbox listening stats, beautifully visualized.
			</p>
		</div>

		<div class="animate-fade-in-up stagger-2 w-full">
			<FileDropzone />
		</div>

		<div class="animate-fade-in-up stagger-3 w-full">
			<FormatGuide />
		</div>

		<div class="animate-fade-in-up stagger-4 flex items-center gap-2 text-xs text-[var(--color-text-muted)] opacity-60">
			<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
			</svg>
			Your data never leaves your browser.
		</div>
	</div>
</div>
