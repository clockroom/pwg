<script setup lang="ts">
import { Tab } from 'bootstrap';
import { onMounted, type Directive } from 'vue';
import { useHistoryStore } from './stores/history-store';
import { usePhraseStore } from './stores/phrase-store';
import Guide from './guide.vue';
import History from './history.vue';
import Home from './home.vue';
import Settings from './settings.vue';

type PaneType = 'guide' | 'history' | 'home' | 'settings';

const { hasHistory, historyEnabled } = useHistoryStore();
const { hasPhrase } = usePhraseStore();

const tabs: Record<PaneType, Tab | null> = {
	guide: null,
	history: null,
	home: null,
	settings: null,
};

const vTab: Directive<HTMLElement, PaneType> = {
	mounted(el, binding) {
		tabs[binding.value] = new Tab(el);
	}
};

onMounted(() => {
	if(!tabs.home || !tabs.history || !tabs.settings || !tabs.guide)
		throw new Error('Tabs are not initialized properly.');
	(hasPhrase.value ? tabs.home : tabs.settings).show();
});
</script>

<template>
	<header class="sticky-top border-bottom bg-light shadow-sm mb-4">
		<nav class="navbar navbar-light">
			<div class="container-fluid justify-content-center justify-content-lg-start">
				<h1 class="navbar-brand m-0">
					<img src="/pwg.png" width="32" height="32">
					パスワードを簡単に使い分けるツール
				</h1>
			</div>
		</nav>
	</header>
	<main class="tab-content">
		<article id="home-tab-pane" class="tab-pane container-fluid">
			<Home />
		</article>
		<article id="history-tab-pane" class="tab-pane container-fluid">
			<History />
		</article>
		<article id="settings-tab-pane" class="tab-pane container-fluid">
			<Settings />
		</article>
		<article id="guide-tab-pane" class="tab-pane container-fluid">
			<Guide />
		</article>
	</main>
	<footer class="fixed-bottom border-top bg-light">
		<nav>
			<div class="nav nav-justified">
				<a class="nav-link fs-3" :class="{ disabled: !hasPhrase }" href="#" data-bs-toggle="tab" data-bs-target="#home-tab-pane" :disabled="!hasPhrase" v-tab="'home'"><i class="bi bi-key-fill"></i><span class="d-none d-lg-inline ms-2">パスワード作成</span></a>
				<a class="nav-link fs-3" :class="{ disabled: !hasPhrase || !hasHistory }" href="#" data-bs-toggle="tab" data-bs-target="#history-tab-pane" :disabled="!hasPhrase || !hasHistory" v-show="historyEnabled" v-tab="'history'"><i class="bi bi-clock-history"></i><span class="d-none d-lg-inline ms-2">履歴</span></a>
				<a class="nav-link fs-3" href="#" data-bs-toggle="tab" data-bs-target="#settings-tab-pane" v-tab="'settings'"><i class="bi bi-gear-fill"></i><span class="d-none d-lg-inline ms-2">設定</span></a>
				<a class="nav-link fs-3" href="#" data-bs-toggle="tab" data-bs-target="#guide-tab-pane" v-tab="'guide'"><i class="bi bi-info-circle-fill"></i><span class="d-none d-lg-inline ms-2">ツールについて</span></a>
			</div>
		</nav>
	</footer>
</template>
