import { computed, ref, watch } from 'vue';

const storedPhrase = localStorage.getItem('phrase') ?? '';

const phrase = ref(storedPhrase);
const phraseSave = ref(Boolean(storedPhrase));

const hasPhrase = computed(() => Boolean(phrase.value));

watch(phrase, () => { savePhrase(); });
watch(phraseSave, () => { savePhrase(); });

const savePhrase = (): void => {
	localStorage.setItem('phrase', phraseSave.value ? phrase.value : '');
};

export function useSettingsStore() {
	return {
		hasPhrase,
		phrase,
		phraseSave,
	};
};
