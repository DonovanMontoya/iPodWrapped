<script lang="ts">
	import { onMount } from 'svelte';

	let { value, duration = 1200, format = (n: number) => n.toLocaleString() }: {
		value: number;
		duration?: number;
		format?: (n: number) => string;
	} = $props();

	let displayed = $state(0);
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
		const start = performance.now();
		const from = 0;
		const to = value;

		function tick(now: number) {
			const elapsed = now - start;
			const progress = Math.min(elapsed / duration, 1);
			// Ease out cubic
			const eased = 1 - Math.pow(1 - progress, 3);
			displayed = Math.round(from + (to - from) * eased);

			if (progress < 1) {
				requestAnimationFrame(tick);
			}
		}

		requestAnimationFrame(tick);
	});
</script>

<span>{mounted ? format(displayed) : format(0)}</span>
