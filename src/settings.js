export default {
	props: [
		'phrase',
		'phraseSave',
	],
	emits: [
		'update:phrase',
		'update:phraseSave',
	],
	data() {
		return {
			phraseShow: false,
			phraseShowTimeout: null,
		};
	},
	computed: {
		hasPhrase() {
			return Boolean(this.phrase);
		},
		phraseValue: {
			get() {
				return this.phrase;
			},
			set(value) {
				this.$emit('update:phrase',value);
			}
		},
		phraseSaveValue: {
			get() {
				return this.phraseSave;
			},
			set(value) {
				this.$emit('update:phraseSave',value);
			}
		},
	},
	watch: {
		phraseShow(newValue,oldValue) {

			this.phraseShowTimeout && clearTimeout(this.phraseShowTimeout);
			this.phraseShowTimeout=null;

			if(!newValue)
				return;

			this.phraseShowTimeout=setTimeout(()=>{
				this.phraseShow=false;
				this.phraseShowTimeout=null;
			},10000);
		},
	},
	mounted() {
		//
	},
	methods: {
		togglePhrase() {
			this.phraseShow=!this.phraseShow;
		},
	},
};
