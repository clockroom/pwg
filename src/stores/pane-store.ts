import { ref, watch } from 'vue';

export type PaneType = 'guide' | 'history' | 'home' | 'settings';

type PaneSettings = {
	starting: PaneType;
};

const storageKey = 'pane';

const storedPaneSettings = load();

const startingPane = ref(storedPaneSettings.starting);

watch(startingPane, () => { save(); });

function load(): PaneSettings
{
	const stored = localStorage.getItem(storageKey);
	const settings: unknown = stored ? JSON.parse(stored) : null;

	const checked = settings &&
		typeof settings === 'object' &&
		'starting' in settings && typeof settings.starting === 'string' &&
		['history', 'home'].includes(settings.starting);

	if (!checked)
	{
		return {
			starting: 'home',
		};
	}

	return settings as PaneSettings;
}

function save(): void
{
	localStorage.setItem(storageKey, JSON.stringify({
		starting: startingPane.value,
	}));
}

export function usePaneStore() {
	return {
		startingPane,
	};
};
