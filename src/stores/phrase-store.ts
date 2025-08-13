import { computed, ref, watch } from 'vue';

const storageKey = 'phrase';

const storedPhrase = load();

const phrase = ref(storedPhrase);
const phraseSave = ref(Boolean(storedPhrase));

const hasPhrase = computed(() => Boolean(phrase.value));

watch(phrase, () => { save(); });
watch(phraseSave, () => { save(); });

function load(): string
{
	return localStorage.getItem(storageKey) ?? '';
}

function save(): void
{
	localStorage.setItem(storageKey, phraseSave.value ? phrase.value : '');
}

export function usePhraseStore() {
	return {
		hasPhrase,
		phrase,
		phraseSave,
	};
};
