<script lang="ts">
	let { data, labels, color = 'var(--color-accent)' }: {
		data: number[];
		labels: string[];
		color?: string;
	} = $props();

	const size = 240;
	const center = size / 2;
	const maxRadius = size / 2 - 20;
	const minRadius = 30;

	let maxValue = $derived(Math.max(...data, 1));

	function getPath(index: number, total: number): string {
		const value = data[index] || 0;
		const radius = minRadius + (maxRadius - minRadius) * (value / maxValue);
		const angleStep = (2 * Math.PI) / total;
		const startAngle = index * angleStep - Math.PI / 2;
		const endAngle = startAngle + angleStep;

		const x1 = center + radius * Math.cos(startAngle);
		const y1 = center + radius * Math.sin(startAngle);
		const x2 = center + radius * Math.cos(endAngle);
		const y2 = center + radius * Math.sin(endAngle);

		const largeArc = angleStep > Math.PI ? 1 : 0;

		return `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
	}

	function getLabelPos(index: number, total: number): { x: number; y: number } {
		const angleStep = (2 * Math.PI) / total;
		const angle = index * angleStep - Math.PI / 2 + angleStep / 2;
		const r = maxRadius + 14;
		return {
			x: center + r * Math.cos(angle),
			y: center + r * Math.sin(angle)
		};
	}
</script>

<svg viewBox="0 0 {size} {size}" class="w-full max-w-[280px] mx-auto">
	{#each data as _, i}
		<path
			d={getPath(i, data.length)}
			fill={color}
			opacity={0.3 + 0.7 * ((data[i] || 0) / maxValue)}
			stroke="rgba(255,255,255,0.1)"
			stroke-width="0.5"
		/>
	{/each}

	{#each labels as label, i}
		{@const pos = getLabelPos(i, data.length)}
		<text
			x={pos.x}
			y={pos.y}
			text-anchor="middle"
			dominant-baseline="central"
			fill="var(--color-text-muted)"
			font-size="8"
			font-family="var(--font-body)"
		>
			{label}
		</text>
	{/each}
</svg>
