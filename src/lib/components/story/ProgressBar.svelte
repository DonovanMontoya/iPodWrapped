<script lang="ts">
	let { total, current }: { total: number; current: number } = $props();
</script>

<div class="flex gap-1 px-4 pt-4">
	{#each Array(total) as _, i}
		<div class="h-[3px] flex-1 rounded-full bg-white/20 overflow-hidden">
			{#if i < current}
				<div class="h-full w-full bg-white rounded-full"></div>
			{:else if i === current}
				<div class="h-full bg-white rounded-full animate-[grow_0.3s_ease-out_forwards]" style="width: 100%"></div>
			{/if}
		</div>
	{/each}
</div>
