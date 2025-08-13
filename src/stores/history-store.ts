import { computed, ref, shallowRef, watch } from 'vue';
import { algorithms, type AlgorithmType } from '../password-generator/factory';

export type HistoryItem = {
	algorithm: AlgorithmType;
	domain: string;
	account: string;
};

const capacity = 10;

const storageKey = 'history';

const storedHistory = load();

const history = shallowRef(storedHistory);
const historyEnabled = ref(storedHistory.length > 0);

const hasHistory = computed(() => history.value.length > 0);

watch(historyEnabled, newValue => {
	newValue || save([]);
});

function addHistory(item: HistoryItem, update: boolean): void
{
	if(!historyEnabled.value)
		return;

	const items = [
		item,
		...history.value.filter(e => e.algorithm !== item.algorithm || e.domain !== item.domain || e.account !== item.account).slice(0, capacity - 1),
	];

	save(items);

	if(update)
		history.value = items;
}

function load(): HistoryItem[]
{
	try
	{
		const stored = localStorage.getItem(storageKey);
		const items: unknown = stored ? JSON.parse(stored) : null;

		if(!Array.isArray(items))
			return [];

		return (items as unknown[]).filter(item => {
			return item && typeof item === 'object' &&
				'algorithm' in item && algorithms.some(e => e === item.algorithm) &&
				'domain' in item && typeof item.domain === 'string' &&
				'account' in item && typeof item.account === 'string' &&
				(item.domain !== '' || item.account !== '');
		}) as HistoryItem[];
	}
	catch
	{
		return [];
	}
}

function save(items: HistoryItem[]): void
{
	localStorage.setItem(storageKey, JSON.stringify(items));
}

export function useHistoryStore() {
	return {
		addHistory,
		hasHistory,
		history,
		historyEnabled,
	};
};
