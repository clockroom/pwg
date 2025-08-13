<script setup lang="ts">
import { computed } from 'vue';
import { useTimedToggle } from './composables/timed-toggle';
import { useHistoryStore } from './stores/history-store';
import { usePhraseStore } from './stores/phrase-store';

const { historyEnabled } = useHistoryStore();
const { hasPhrase, phrase, phraseSave } = usePhraseStore();

const { enabled: phraseVisible, toggle: togglePhraseVisible } = useTimedToggle();

const phraseInputType = computed(() => phraseVisible.value ? 'text' : 'password');
</script>

<template>
	<section>
		<div class="row mb-1">
			<div class="col col-lg-6">
				<div class="input-group">
					<div class="form-floating">
						<input :type="phraseInputType" class="form-control form-control-lg" :class="{ 'is-invalid': !hasPhrase }" placeholder="マスターパスワード" v-model="phrase">
						<label for="phrase">マスターパスワード</label>
					</div>
					<button type="button" class="btn btn-outline-secondary" @click.prevent="togglePhraseVisible()"><i class="bi" :class="{ 'bi-eye-fill': phraseVisible, 'bi-eye-slash-fill': !phraseVisible }"></i></button>
				</div>
			</div>
		</div>
		<div class="form-check form-switch form-control-lg">
			<input type="checkbox" id="phrase-save" class="form-check-input" v-model="phraseSave">
			<label class="form-check-label" for="phrase-save">マスターパスワードを記憶</label>
		</div>
		<div class="form-check form-switch form-control-lg">
			<input type="checkbox" id="history-enabled" class="form-check-input" v-model="historyEnabled">
			<label class="form-check-label" for="history-enabled">履歴を残す</label>
		</div>
	</section>
</template>
