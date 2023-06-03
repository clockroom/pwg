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
	<Result name="an10" placeholder="英大小・数字・10桁" :value="results.an10" />
	<Result name="an10b" placeholder="英大小・数字・10桁・使用文字限定" :value="results.an10b" />
	<Result name="ans12" placeholder="英大小・数字・記号・12桁・使用文字限定" :value="results.ans12" />
	<Result name="an8" placeholder="英大小・数字・8桁" :value="results.an8" />
	<Result name="pin" placeholder="PIN（数字・4桁）" :value="results.pin" />
	<Result name="signature" placeholder="署名用電子証明書（英大・数字・10桁・使用文字限定）" :value="results.signature">
		<template #label>署名用<span class="d-none d-sm-inline">電子証明書</span>（英大・数字・10桁・使用文字限定）</template>
	</Result>
</template>
<script src="./home.js"></script>
