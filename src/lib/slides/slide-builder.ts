import type { WrappedStats } from '../stats/types';
import type { SlideConfig } from './types';
import { SLIDE_REGISTRY } from './slide-registry';

export function buildSlideDeck(stats: WrappedStats): SlideConfig[] {
	return SLIDE_REGISTRY.filter((slide) => slide.condition(stats));
}
