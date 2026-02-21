import type { ScrobbleEntry, ParseResult } from '../parser/types';

class ScrobbleDataStore {
	entries = $state<ScrobbleEntry[]>([]);
	parseResult = $state<ParseResult | null>(null);

	load(result: ParseResult) {
		this.parseResult = result;
		this.entries = result.entries;
	}

	reset() {
		this.entries = [];
		this.parseResult = null;
	}
}

export const scrobbleData = new ScrobbleDataStore();
