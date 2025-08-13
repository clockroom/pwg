<script setup lang="ts">
import { computed } from 'vue';
import { createPasswordGenerator } from './password-generator/factory';
import { useHistoryStore, type HistoryItem } from './stores/history-store';
import { usePhraseStore } from './stores/phrase-store';
import Result from './result.vue';

const { addHistory, history } = useHistoryStore();
const { phrase } = usePhraseStore();

const results = computed(() => {
	return history.value.map(item => {
		return {
			item,
			password: createPasswordGenerator(item.algorithm, item.domain + item.account + phrase.value).generate(),
			placeholder: [item.domain, item.account].filter(e => e !== '').join(' - '),
		};
	});
});

function onResultCopied(item: HistoryItem): void
{
	addHistory(item, false);
}
</script>

<template>
	<template v-for="result in results">
		<Result :mask="true" :placeholder="result.placeholder" :value="result.password" @copied="onResultCopied(result.item)" />
	</template>
</template>
