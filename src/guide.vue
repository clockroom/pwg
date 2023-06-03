<template>
	<section class="mb-5">
		<h2>概要</h2>
		<ul>
			<li class="mt-3">サービスごとに異なるパスワードの作成して使い分けることを支援します。</li>
		</ul>
	</section>
	<section class="mb-5">
		<h2>利用方法</h2>
		<ul>
			<li class="mt-3">マスターパスワードを設定してからサービス名を入力すると自動的にパスワードを作成します。</li>
			<li class="mt-3">以前と同じマスターパスワードとサービス名を入力すると同じパスワードを再現します。</li>
			<li class="mt-3">
				マスターパスワードはパスワードを作成するためのパスワードです。
				マスターパスワードを忘れるとパスワードを再現できなくなるのでご注意ください。
			</li>
			<li class="mt-3">
				サービス名にURLを入力した場合はドメイン部分のみ使用します。
			</li>
			<li class="mt-3">ひとつのサービスで複数のパスワードを作成する場合はアカウントを入力してください。</li>
			<li class="mt-3">「使用文字限定」の表示があるパスワードは、区別が難しい文字（Iとl、0とOなど）、ログイン不能などのトラブルを起こしやすい記号を除外しています。</li>
			<li class="mt-3">
				Progressive Web Appsに対応してます。
				スマホまたは一部のブラウザではアプリとしてインストール可能です。
			</li>
		</ul>
	</section>
	<section class="mb-5">
		<h2>注意事項</h2>
		<ul>
			<li class="mt-3">「同じパスワードを使いまわすよりはマシ」というコンセプトに基づいた設計のため、パスワードの強度は保証できません。</li>
			<li class="mt-3">
				入力内容をサーバに送信することはありませんが、不安を感じる場合は利用をご遠慮ください。
				このツールはソースコード(下記)を公開しています。
			</li>
			<li class="mt-3">予告なく公開中止する場合があります。</li>
		</ul>
	</section>
	<section class="mb-5">
		<h2>利用規約</h2>
		<ul>
			<li class="mt-3">CRCC(<a href="https://crcc.clockroom.net/" target="_blank">https://crcc.clockroom.net/</a>)に準拠</li>
		</ul>
	</section>
	<section class="mb-5">
		<h2>ソースコード</h2>
		<ul>
			<li class="mt-3">GitHub(<a href="https://github.com/clockroom/pwg" target="_blank">https://github.com/clockroom/pwg</a>)</li>
		</ul>
	</section>
	<section>
		<p class="text-end mb-1">パスワードを簡単に使い分けるツール {{ version }}</p>
		<p class="text-end m-0">Copyright (C) <span class="d-none d-sm-inline">2014-</span>{{ year }} ときかけうさぎ, ClockRoom</p>
	</section>
</template>
<script src="./guide.js"></script>
