import type { WrappedStats } from '../stats/types';
import type { Component } from 'svelte';

export interface SlideConfig {
	id: string;
	title: string;
	exportable: boolean;
	condition: (stats: WrappedStats) => boolean;
	getData: (stats: WrappedStats) => Record<string, unknown>;
	gradient: [string, string];
}
