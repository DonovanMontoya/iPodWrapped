<script lang="ts">
	import { fly } from 'svelte/transition';
	import { wrappedStats } from '$lib/stores/wrapped-stats.svelte';
	import { appStore } from '$lib/stores/app.svelte';
	import { buildSlideDeck } from '$lib/slides/slide-builder';
	import ProgressBar from './ProgressBar.svelte';
	import SlideRenderer from './SlideRenderer.svelte';

	let currentIndex = $state(0);
	let direction = $state(1);
	let pointerStartX = 0;
	let pointerStartY = 0;

	let slides = $derived(wrappedStats.stats ? buildSlideDeck(wrappedStats.stats) : []);
	let currentSlide = $derived(slides[currentIndex]);

	function next() {
		if (currentIndex < slides.length - 1) {
			direction = 1;
			currentIndex++;
		} else {
			appStore.setPhase('export');
		}
	}

	function prev() {
		if (currentIndex > 0) {
			direction = -1;
			currentIndex--;
		}
	}

	function onPointerDown(e: PointerEvent) {
		pointerStartX = e.clientX;
		pointerStartY = e.clientY;
	}

	function onPointerUp(e: PointerEvent) {
		const dx = e.clientX - pointerStartX;
		const dy = e.clientY - pointerStartY;

		if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
			if (dx < 0) next();
			else prev();
		} else {
			const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
			const tapX = (e.clientX - rect.left) / rect.width;
			if (tapX < 0.3) prev();
			else next();
		}
	}

	function onKeyDown(e: KeyboardEvent) {
		if (e.key === 'ArrowRight' || e.key === ' ') {
			e.preventDefault();
			next();
		} else if (e.key === 'ArrowLeft') {
			e.preventDefault();
			prev();
		} else if (e.key === 'Escape') {
			appStore.setPhase('landing');
		}
	}
</script>

<svelte:window onkeydown={onKeyDown} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="fixed inset-0 z-50 flex flex-col select-none touch-none"
	style="background: linear-gradient(135deg, {currentSlide?.gradient[0] ?? '#0a0a0f'}, {currentSlide?.gradient[1] ?? '#0a0a0f'}); transition: background 0.4s ease;"
	onpointerdown={onPointerDown}
	onpointerup={onPointerUp}
>
	<ProgressBar total={slides.length} current={currentIndex} />

	<div class="flex-1 relative overflow-hidden">
		{#if currentSlide && wrappedStats.stats}
			{#key currentIndex}
				<div
					class="absolute inset-0 flex items-center justify-center p-6"
					in:fly={{ x: direction * 300, duration: 400, delay: 50 }}
					out:fly={{ x: direction * -300, duration: 300 }}
				>
					<SlideRenderer
						slideId={currentSlide.id}
						data={currentSlide.getData(wrappedStats.stats)}
					/>
				</div>
			{/key}
		{/if}
	</div>

	<div class="px-4 pb-4 text-center">
		<p class="text-xs text-white/30">
			{currentIndex + 1} / {slides.length} &middot; Tap or use arrow keys
		</p>
	</div>
</div>
