<script setup lang="ts">
import { Tab } from 'bootstrap';
import { onMounted, useTemplateRef } from 'vue';
import { useSettingsStore } from './settings-store';
import Guide from './guide.vue';
import Home from './home.vue';
import Settings from './settings.vue';

const { hasPhrase } = useSettingsStore();

const guideTabRef = useTemplateRef('guideTab');
const homeTabRef = useTemplateRef('homeTab');
const settingsTabRef = useTemplateRef('settingsTab');

let guideTab: Tab;
let homeTab: Tab;
let settingsTab: Tab;

onMounted(() => {

	if(!guideTabRef.value || !homeTabRef.value || !settingsTabRef.value)
		throw new Error('Template references for tabs are not found.');

	guideTab = new Tab(guideTabRef.value);
	homeTab = new Tab(homeTabRef.value);
	settingsTab = new Tab(settingsTabRef.value);

	(hasPhrase.value ? homeTab : settingsTab).show();
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
				<a ref="homeTab" class="nav-link fs-3" :class="{ disabled: !hasPhrase }" href="#" data-bs-toggle="tab" data-bs-target="#home-tab-pane" :disabled="!hasPhrase"><i class="bi bi-key-fill"></i><span class="d-none d-lg-inline ms-2">パスワード作成</span></a>
				<a ref="settingsTab" class="nav-link fs-3" href="#" data-bs-toggle="tab" data-bs-target="#settings-tab-pane"><i class="bi bi-gear-fill"></i><span class="d-none d-lg-inline ms-2">設定</span></a>
				<a ref="guideTab" class="nav-link fs-3" href="#" data-bs-toggle="tab" data-bs-target="#guide-tab-pane"><i class="bi bi-info-circle-fill"></i><span class="d-none d-lg-inline ms-2">ツールについて</span></a>
			</div>
		</nav>
	</footer>
</template>
