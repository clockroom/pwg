<template>
	<div class="row mb-1">
		<div class="col col-lg-6">
			<div class="input-group">
				<div class="form-floating">
					<input type="text" :id="`result-${name}`" class="form-control form-control-lg" :value="value" :placeholder="placeholder" readonly @click="selectValue($event)">
					<label :for="`result-${name}`">
						<slot name="label">{{ placeholder }}</slot>
					</label>
				</div>
				<button type="button" ref="copy" class="btn btn-outline-secondary" :class="{ disabled: !canCopy() }" :disabled="!canCopy()" @click.prevent="copyValue()"><i class="bi bi-clipboard-fill"></i></button>
			</div>
		</div>
	</div>
</template>
<script src="./result.js"></script>
