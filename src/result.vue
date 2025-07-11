<script setup lang="ts">
import { Tooltip } from 'bootstrap';
import { onMounted, useTemplateRef } from 'vue';

const canCopy = Boolean(navigator.clipboard);

const { name, placeholder, value } = defineProps<{
	name: string;
	placeholder: string;
	value: string;
}>();

const copyRef = useTemplateRef('copy');

let tooltip: Tooltip;

onMounted(() => {

	if(!canCopy)
		return;

	if(!copyRef.value)
		throw new Error('Template references for copy button is not found.');

	tooltip = new Tooltip(copyRef.value, {
		trigger: 'manual',
		title: 'コピーしました',
	});
});

const selectValue = (event: MouseEvent): void => {
	const input = event.currentTarget as HTMLInputElement;
	input.setSelectionRange(0, 100);
};

const copyValue = (): void => {

	if(!canCopy)
		return;

	navigator.clipboard.writeText(value).then(() => {
		tooltip.show();
		setTimeout(() => {
			tooltip.hide();
		}, 1000);
	});
};
</script>

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
				<button type="button" ref="copy" class="btn btn-outline-secondary" :class="{ disabled: !canCopy }" :disabled="!canCopy" @click.prevent="copyValue()"><i class="bi bi-clipboard-fill"></i></button>
			</div>
		</div>
	</div>
</template>
