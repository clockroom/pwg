<template>
	<section>
		<div class="row mb-1">
			<div class="col col-lg-6">
				<div class="input-group">
					<div class="form-floating">
						<input :type="phraseShow ? 'text' : 'password'" class="form-control form-control-lg" :class="{ 'is-invalid': !hasPhrase }" placeholder="マスターパスワード" v-model="phraseValue">
						<label for="phrase">マスターパスワード</label>
					</div>
					<button type="button" class="btn btn-outline-secondary" @click.prevent="togglePhrase()"><i class="bi" :class="{ 'bi-eye-fill': phraseShow, 'bi-eye-slash-fill': !phraseShow }"></i></button>
				</div>
			</div>
		</div>
		<div class="form-check form-switch form-control-lg">
			<input type="checkbox" id="phrase-save" class="form-check-input" v-model="phraseSaveValue">
			<label class="form-check-label" for="phrase-save">マスターパスワードを記憶</label>
		</div>
	</section>
</template>
<script src="./settings.js"></script>
