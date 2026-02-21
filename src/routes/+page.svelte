<script lang="ts">
	import { appStore } from '$lib/stores/app.svelte';
	import LandingPage from '$lib/components/landing/LandingPage.svelte';
	import StoryPlayer from '$lib/components/story/StoryPlayer.svelte';
	import ExportView from '$lib/components/export/ExportView.svelte';
</script>

<svelte:head>
	<title>iPod Wrapped</title>
</svelte:head>

{#if appStore.phase === 'landing'}
	<LandingPage />
{:else if appStore.phase === 'story'}
	<StoryPlayer />
{:else if appStore.phase === 'export'}
	<ExportView />
{/if}
