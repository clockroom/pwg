<script setup lang="ts">
import { computed, ref } from 'vue';
import { createPasswordGenerator, algorithms, type AlgorithmType } from './password-generator/factory';
import { useHistoryStore } from './stores/history-store';
import { usePhraseStore } from './stores/phrase-store';
import Result from './result.vue';

const { addHistory } = useHistoryStore();
const { phrase } = usePhraseStore();

const serviceName = ref('');
const account = ref('');

const domain = computed(() => serviceName.value.match(/^https?:\/\/([^/]+)/)?.[1] ?? serviceName.value);
const isDomain = computed(() => serviceName.value !== domain.value);

const results = computed(() => {
	return Object.fromEntries(algorithms.map(algorithm => [
		algorithm,
		createPasswordGenerator(algorithm, domain.value + account.value + phrase.value).generate(),
	]));
});

function onResultCopied(algorithm: AlgorithmType): void
{
	if(domain.value === '' && account.value === '')
		return;

	addHistory({
		algorithm,
		domain: domain.value,
		account: account.value,
	}, true);
}
</script>

<template>
	<div class="row align-items-center mb-3">
		<div class="col-12 col-lg-6">
			<input type="text" class="form-control form-control-lg" placeholder="サービス名・URL など" v-model="serviceName">
		</div>
		<div class="col-12 col-lg-6" v-if="isDomain">
			<span class="form-text fs-4">( {{ domain }} )</span>
		</div>
	</div>
	<div class="row mb-3">
		<div class="col col-lg-6">
			<input type="text" class="form-control form-control-lg" placeholder="アカウント（任意）" v-model="account">
		</div>
	</div>
	<Result placeholder="英大小・数字・12桁（v2）" :value="results.an12V2" @copied="onResultCopied('an12V2')" />
	<Result placeholder="英大小・数字・記号・12桁（v2）" :value="results.ans12V2" @copied="onResultCopied('ans12V2')" />
	<div class="row">
		<div class="col col-lg-6">
			<hr>
		</div>
	</div>
	<Result placeholder="英大小・数字・10桁" :value="results.an10" @copied="onResultCopied('an10')" />
	<Result placeholder="英大小・数字・10桁・使用文字限定" :value="results.an10b" @copied="onResultCopied('an10b')" />
	<Result placeholder="英大小・数字・記号・12桁・使用文字限定" :value="results.ans12" @copied="onResultCopied('ans12')" />
	<Result placeholder="英大小・数字・8桁" :value="results.an8" @copied="onResultCopied('an8')" />
	<div class="row">
		<div class="col col-lg-6">
			<hr>
		</div>
	</div>
	<Result placeholder="PIN（数字・4桁）" :value="results.pin" @copied="onResultCopied('pin')" />
	<Result placeholder="署名用電子証明書（英大・数字・10桁・使用文字限定）" :value="results.signature" @copied="onResultCopied('signature')">
		<template #label>署名用<span class="d-none d-sm-inline">電子証明書</span>（英大・数字・10桁・使用文字限定）</template>
	</Result>
</template>
