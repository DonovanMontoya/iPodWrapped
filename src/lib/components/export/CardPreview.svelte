<script lang="ts">
	import { downloadDataUrl } from '$lib/export/card-renderer';

	let { name, dataUrl }: { name: string; dataUrl: string } = $props();

	function download() {
		downloadDataUrl(dataUrl, `ipod-wrapped-${name}.png`);
	}
</script>

<div class="flex flex-col gap-2">
	<div class="rounded-xl overflow-hidden border border-[var(--color-border)] bg-black">
		<img src={dataUrl} alt="{name} card" class="w-full" />
	</div>
	<button
		class="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors cursor-pointer text-center"
		onclick={download}
		type="button"
	>
		Download
	</button>
</div>
