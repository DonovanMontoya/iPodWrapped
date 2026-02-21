export type AppPhase = 'landing' | 'story' | 'export';

class AppStore {
	phase = $state<AppPhase>('landing');

	setPhase(phase: AppPhase) {
		this.phase = phase;
	}

	reset() {
		this.phase = 'landing';
	}
}

export const appStore = new AppStore();
