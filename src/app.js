import { Tab } from 'bootstrap';
import Guide from './guide.vue';
import Home from './home.vue';
import Settings from './settings.vue';

let guideTab=null;
let homeTab=null;
let settingsTab=null;

export default {
	components: {
		Guide,
		Home,
		Settings,
	},
	data() {
		const versionYear=__PACKAGE_VERSION__.split('-');
		return {
			phrase: null,
			phraseSave: false,
			version: versionYear[0],
			year: versionYear[1],
		};
	},
	computed: {
		hasPhrase() {
			return Boolean(this.phrase);
		},
	},
	watch: {
		phrase(newValue,oldValue) {
			this.savePhrase();
		},
		phraseSave(newValue,oldValue) {
			this.savePhrase();
		},
	},
	mounted() {

		this.phrase=localStorage.getItem('phrase');
		this.phraseSave=this.hasPhrase;

		this.$nextTick(()=>{

			guideTab=new Tab(this.$refs.guideTab);
			homeTab=new Tab(this.$refs.homeTab);
			settingsTab=new Tab(this.$refs.settingsTab);

			(this.hasPhrase ? homeTab : settingsTab).show();
		});
	},
	methods: {
		savePhrase() {
			localStorage.setItem('phrase',this.phraseSave ? this.phrase : '');
		},
	},
};
