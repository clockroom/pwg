import { ref, watch } from 'vue';

export function useTimedToggle(timeout: number = 10000) {

	const enabled = ref(false);

	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	watch(enabled, newValue => {

		timeoutId && clearTimeout(timeoutId);
		timeoutId = null;

		if(!newValue)
			return;

		timeoutId = setTimeout(() => {
			enabled.value = false;
			timeoutId = null;
		}, timeout);
	});

	function toggle(): void
	{
		enabled.value = !enabled.value;
	}

	return {
		enabled,
		toggle,
	};
};
