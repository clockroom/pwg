import Xorshift from './xorshift';

export default class PasswordGenerator {

	private readonly token: string;
	private readonly pattern: readonly number[];
	private readonly splice: boolean;
	private readonly seed: number;

	constructor(token: string, pattern: readonly number[], splice: boolean = true, seed: number = 0)
	{
		this.token = token;
		this.pattern = pattern;
		this.splice = splice;
		this.seed = seed;
	}

	public generate(): string
	{
		const pattern = [...this.pattern];
		const charTable = [
			this.charCodeArray('0123456789'),
			this.charCodeArray('abcdefghijklmnopqrstuvwxyz'),
			this.charCodeArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
			this.charCodeArray('!$%+'),
			this.charCodeArray('34679'),
			this.charCodeArray('abdefhknpqrty'),
			this.charCodeArray('ACEFGHJKLMNPRTWXY'),
			this.charCodeArray('!@#'),
		];

		const rnd = this.rootRandom(this.token, this.seed);
		let result = '';

		while(pattern.length > 0)
		{
			const patternIndex = rnd.next() % pattern.length;
			const charTableIndex = pattern[patternIndex];
			const chars = charTable[charTableIndex];
			const charIndex = rnd.next() % chars.length;

			result += String.fromCharCode(chars[charIndex]);

			if(this.splice || charTableIndex == 3 || charTableIndex == 4)
				chars.splice(charIndex, 1);

			pattern.splice(patternIndex, 1);
		}

		return result;
	}

	private rootRandom(token: string, seed: number): Xorshift
	{
		const tokenCharCodes = this.charCodeArray(token);

		let rnd = new Xorshift();

		for(let i = 0; i < tokenCharCodes.length; i++)
		{
			for(let j = 0; j < tokenCharCodes[i]; j++)
				rnd.next();

			const nextSeeds = [rnd.next(), rnd.next(), rnd.next(), rnd.next()];

			if(seed > 0)
			{
				rnd = new Xorshift(...nextSeeds.reverse());
			}
			else
			{
				rnd = new Xorshift(...nextSeeds);
			}
		}

		for(let i = 0; i < seed; i++)
			rnd.next();

		return rnd;
	}

	private charCodeArray(value: string): number[]
	{
		return [...value].map(char => char.charCodeAt(0));
	}

};
