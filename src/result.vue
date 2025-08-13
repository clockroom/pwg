<script setup lang="ts">
import { Tooltip } from 'bootstrap';
import { computed, useId, type Directive } from 'vue';
import { useTimedToggle } from './composables/timed-toggle';

const { mask=false, placeholder, value } = defineProps<{
	mask?: boolean;
	placeholder: string;
	value: string;
}>();

const emit = defineEmits<{
	copied: [];
}>();

const { enabled: timedToggleVisible, toggle: toggleVisible } = useTimedToggle();

const visible = computed(() => !mask || timedToggleVisible.value);
const inputType = computed(() => visible.value ? 'text' : 'password');

const inputId = useId();

const canCopy = Boolean(navigator.clipboard);

let tooltip: Tooltip;

const vCopiedTooltip: Directive<HTMLElement> = {
	mounted(el) {
		if(!canCopy)
			return;
		tooltip = new Tooltip(el, {
			trigger: 'manual',
			title: 'コピーしました',
		});
	}
};

function copyValue(): void
{
	if(!canCopy)
		return;

	navigator.clipboard.writeText(value).then(() => {
		tooltip.show();
		emit('copied');
		setTimeout(() => {
			tooltip.hide();
		}, 1000);
	});
}

function selectValue(event: MouseEvent): void
{
	if(!visible.value)
		return;
	const input = event.currentTarget as HTMLInputElement;
	input.setSelectionRange(0, 100);
}
</script>

<template>
	<div class="row mb-1">
		<div class="col col-lg-6">
			<div class="input-group">
				<div class="form-floating">
					<input :type="inputType" :id="inputId" class="form-control form-control-lg" :value="value" :placeholder="placeholder" :disabled="!visible" :readonly="visible" @click="selectValue($event)">
					<label :for="inputId">
						<slot name="label">{{ placeholder }}</slot>
					</label>
				</div>
				<button type="button" class="btn btn-outline-secondary" @click.prevent="toggleVisible()" v-if="mask"><i class="bi" :class="{ 'bi-eye-fill': visible, 'bi-eye-slash-fill': !visible }"></i></button>
				<button type="button" class="btn btn-outline-secondary" :class="{ disabled: !canCopy }" :disabled="!canCopy" @click.prevent="copyValue()" v-copied-tooltip><i class="bi bi-clipboard-fill"></i></button>
			</div>
		</div>
	</div>
</template>
