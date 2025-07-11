<script setup lang="ts">
import { computed, ref } from 'vue';
import Result from './result.vue';
import An8Generator from './password-generator/an8-generator';
import An10Generator from './password-generator/an10-generator';
import An10bGenerator from './password-generator/an10b-generator';
import An12V2Generator from './password-generator/an12v2-generator';
import Ans12Generator from './password-generator/ans12-generator';
import Ans12V2Generator from './password-generator/ans12v2-generator';
import PinGenerator from './password-generator/pin-generator';
import SignatureGenerator from './password-generator/signature-generator';

const { phrase } = defineProps<{
	phrase: string;
}>();

const serviceName = ref('');
const account = ref('');

const domain = computed(() => serviceName.value.match(/^https?:\/\/([^/]+)/)?.[1] ?? serviceName.value);
const useDomain = computed(() => serviceName.value !== domain.value);

const results = computed(() => {
	const token = domain.value + account.value + phrase;
	return {
		an8: (new An8Generator(token)).generate(),
		an10: (new An10Generator(token)).generate(),
		an10b: (new An10bGenerator(token)).generate(),
		an12V2: (new An12V2Generator(token)).generate(),
		ans12: (new Ans12Generator(token)).generate(),
		ans12V2: (new Ans12V2Generator(token)).generate(),
		pin: (new PinGenerator(token)).generate(),
		signature: (new SignatureGenerator(token)).generate(),
	};
});
</script>

<template>
	<div class="row align-items-center mb-3">
		<div class="col-12 col-lg-6">
			<input type="text" class="form-control form-control-lg" placeholder="サービス名・URL など" v-model="serviceName">
		</div>
		<div class="col-12 col-lg-6" v-if="useDomain">
			<span class="form-text fs-4">( {{ domain }} )</span>
		</div>
	</div>
	<div class="row mb-3">
		<div class="col col-lg-6">
			<input type="text" class="form-control form-control-lg" placeholder="アカウント（任意）" v-model="account">
		</div>
	</div>
	<Result name="an12v2" placeholder="英大小・数字・12桁（v2）" :value="results.an12V2" />
	<Result name="ans12v2" placeholder="英大小・数字・記号・12桁（v2）" :value="results.ans12V2" />
	<div class="row">
		<div class="col col-lg-6">
			<hr>
		</div>
	</div>
	<Result name="an10" placeholder="英大小・数字・10桁" :value="results.an10" />
	<Result name="an10b" placeholder="英大小・数字・10桁・使用文字限定" :value="results.an10b" />
	<Result name="ans12" placeholder="英大小・数字・記号・12桁・使用文字限定" :value="results.ans12" />
	<Result name="an8" placeholder="英大小・数字・8桁" :value="results.an8" />
	<div class="row">
		<div class="col col-lg-6">
			<hr>
		</div>
	</div>
	<Result name="pin" placeholder="PIN（数字・4桁）" :value="results.pin" />
	<Result name="signature" placeholder="署名用電子証明書（英大・数字・10桁・使用文字限定）" :value="results.signature">
		<template #label>署名用<span class="d-none d-sm-inline">電子証明書</span>（英大・数字・10桁・使用文字限定）</template>
	</Result>
</template>
