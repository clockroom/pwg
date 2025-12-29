<script setup lang="ts">
import { computed } from 'vue';
import { useTimedToggle } from './composables/timed-toggle';
import { useHistoryStore } from './stores/history-store';
import { usePaneStore } from './stores/pane-store';
import { usePhraseStore } from './stores/phrase-store';

const { historyEnabled } = useHistoryStore();
const { startingPane } = usePaneStore();
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
		<fieldset class="mt-3" :disabled="!historyEnabled">
			<legend class="col-form-label form-control-lg px-0">初期表示</legend>
			<div class="px-4">
				<div class="form-check form-control-lg">
					<input type="radio" id="starting-pane-home" class="form-check-input" name="default-view" value="home" v-model="startingPane">
					<label class="form-check-label" for="starting-pane-home">パスワード作成</label>
				</div>
				<div class="form-check form-control-lg">
					<input type="radio" id="starting-pane-history" class="form-check-input" name="default-view" value="history" v-model="startingPane">
					<label class="form-check-label" for="starting-pane-history">履歴</label>
				</div>
			</div>
		</fieldset>
	</section>
</template>
