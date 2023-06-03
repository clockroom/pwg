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
			<Home :phrase="phrase" />
		</article>
		<article id="settings-tab-pane" class="tab-pane container-fluid">
			<Settings v-model:phrase="phrase"  v-model:phrase-save="phraseSave" />
		</article>
		<article id="guide-tab-pane" class="tab-pane container-fluid">
			<Guide :version="version" :year="year" />
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
<script src="./app.js"></script>
