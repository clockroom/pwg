import { Tooltip } from 'bootstrap';

export default {
	props: [
		'name',
		'placeholder',
		'value',
	],
	data() {
		return {
			tooltip: null,
		};
	},
	mounted() {
		this.tooltip=new Tooltip(this.$refs.copy,{
			trigger: 'manual',
			title: 'コピーしました',
		});
	},
	methods: {
		canCopy() {
			return Boolean(navigator.clipboard);
		},
		selectValue(event) {
			event.currentTarget.setSelectionRange(0,100);
		},
		copyValue() {

			if(!this.canCopy)
				return;

			navigator.clipboard.writeText(this.value).then(()=>{
				this.tooltip.show()
				setTimeout(()=>{
					this.tooltip.hide();
				},1000);
			});
		},
	},
};
