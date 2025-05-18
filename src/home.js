import Xorshift from './xorshift';
import Result from './result.vue';

export default {
	props: [
		'phrase',
	],
	components: {
		Result,
	},
	data() {
		return {
			serviceName: '',
			account: '',
		};
	},
	computed: {
		domain() {
			const matchs=this.serviceName.match(/^https?:\/\/([^\/]+)/);
			return matchs ? matchs[1] : this.serviceName;
		},
		useDomain() {
			return this.serviceName!=this.domain;
		},
		results() {
			return {
				an12_2: this.generate([0,0,1,1,1,1,1,1,2,2,2,2],false,1),
				ans12_2: this.generate([0,0,1,1,1,1,1,1,2,2,2,7],false,2),
				an10: this.generate([0,0,0,0,1,1,1,2,2,2]),
				an10b: this.generate([4,5,6,4,5,6,4,5,6,5],false),
				ans12: this.generate([3,4,5,6,3,4,5,6,4,5,6,5],false),
				an8: this.generate([0,0,0,0,1,1,2,2]),
				pin: this.generate([0,0,0,0],false),
				signature: this.generate([6,4,6,4,6,6,4,6,4,6],false),
			};
		},
	},
	mounted() {
		//
	},
	methods: {
		generate(pattern,splice=true,seed=0) {

			const charTable=[
				this.charCodeArray('0123456789'),
				this.charCodeArray('abcdefghijklmnopqrstuvwxyz'),
				this.charCodeArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				this.charCodeArray('!$%+'),
				this.charCodeArray('34679'),
				this.charCodeArray('abdefhknpqrty'),
				this.charCodeArray('ACEFGHJKLMNPRTWXY'),
				this.charCodeArray('!@#'),
			];

			const rnd=this.rootRandom(seed);
			const resultLength=pattern.length;
			let result='';

			for(let i=0;i<resultLength;i++)
			{
				const patternIndex=rnd.next()%pattern.length;
				const charTableIndex=pattern[patternIndex];
				const chars=charTable[charTableIndex];
				const charIndex=rnd.next()%chars.length;

				result+=String.fromCharCode(chars[charIndex]);

				if(splice || charTableIndex==3 || charTableIndex==4)
					chars.splice(charIndex,1);

				pattern.splice(patternIndex,1);
			}

			return result;
		},
		rootRandom(seed) {

			const token=this.charCodeArray(this.domain + this.account + this.phrase);

			let rnd=new Xorshift();

			for(let i=0;i<token.length;i++)
			{
				for(let j=0;j<token[i];j++)
					rnd.next();

				if(seed>0)
				{
					rnd=new Xorshift(...[rnd.next(),rnd.next(),rnd.next(),rnd.next()].reverse());
				}
				else
				{
					rnd=new Xorshift(rnd.next(),rnd.next(),rnd.next(),rnd.next());
				}
			}

			for(let i=0;i<seed;i++)
				rnd.next();

			return rnd;
		},
		charCodeArray(value) {
			const result=[];
			for(let i=0;i<value.length;i++)
				result.push(value.charCodeAt(i));
			return result;
		},
	},
};
