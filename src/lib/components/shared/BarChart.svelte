<script lang="ts">
	let { items, color = 'var(--color-accent)' }: {
		items: { label: string; sublabel?: string; value: number }[];
		color?: string;
	} = $props();

	let maxValue = $derived(Math.max(...items.map((i) => i.value), 1));
</script>

<div class="flex flex-col gap-3">
	{#each items as item, i}
		<div class="animate-fade-in-up stagger-{i + 1}">
			<div class="flex items-center justify-between text-sm mb-1">
				<div class="min-w-0">
					<span class="font-medium truncate block">{item.label}</span>
					{#if item.sublabel}
						<span class="text-xs text-[var(--color-text-muted)] truncate block">{item.sublabel}</span>
					{/if}
				</div>
				<span class="text-[var(--color-text-muted)] ml-3 shrink-0">{item.value} plays</span>
			</div>
			<div class="h-2 rounded-full bg-white/10 overflow-hidden">
				<div
					class="h-full rounded-full transition-all duration-1000 ease-out"
					style="width: {(item.value / maxValue) * 100}%; background: {color}; animation-delay: {i * 0.1}s"
				></div>
			</div>
		</div>
	{/each}
</div>
