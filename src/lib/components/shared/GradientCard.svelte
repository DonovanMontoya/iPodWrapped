<script lang="ts">
	import type { Snippet } from 'svelte';

	let { gradient, children, aspect = '9/16' }: {
		gradient: [string, string];
		children: Snippet;
		aspect?: string;
	} = $props();
</script>

<div
	class="relative rounded-3xl overflow-hidden flex flex-col justify-center items-center p-8"
	style="background: linear-gradient(135deg, {gradient[0]}, {gradient[1]}); aspect-ratio: {aspect};"
>
	<div class="relative z-10 w-full h-full flex flex-col justify-center">
		{@render children()}
	</div>

	<!-- Watermark -->
	<div class="absolute bottom-4 left-0 right-0 text-center">
		<span class="text-[10px] font-medium tracking-wider uppercase text-white/20">
			iPod Wrapped
		</span>
	</div>
</div>
