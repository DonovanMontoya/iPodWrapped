import type { ScrobbleEntry } from '../parser/types';
import type { WrappedStats } from '../stats/types';
import { aggregateAll } from '../stats/aggregator';

class WrappedStatsStore {
	stats = $state<WrappedStats | null>(null);
	loading = $state(false);
	error = $state<string | null>(null);

	compute(entries: ScrobbleEntry[]) {
		this.loading = true;
		this.error = null;
		try {
			this.stats = aggregateAll(entries);
		} catch (e) {
			this.error = e instanceof Error ? e.message : String(e);
		} finally {
			this.loading = false;
		}
	}

	reset() {
		this.stats = null;
		this.error = null;
		this.loading = false;
	}
}

export const wrappedStats = new WrappedStatsStore();
