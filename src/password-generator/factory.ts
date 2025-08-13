import PasswordGenerator from './password-generator';
import an8 from './an8-generator';
import an10 from './an10-generator';
import an10b from './an10b-generator';
import an12V2 from './an12v2-generator';
import ans12 from './ans12-generator';
import ans12V2 from './ans12v2-generator';
import pin from './pin-generator';
import signature from './signature-generator';

const algorithmClassMap = {
	an8,
	an10,
	an10b,
	an12V2,
	ans12,
	ans12V2,
	pin,
	signature,
} as const;

export const algorithms = Object.keys(algorithmClassMap) as ReadonlyArray<keyof typeof algorithmClassMap>;

export type AlgorithmType = typeof algorithms[number];

export function createPasswordGenerator(algorithm: AlgorithmType, token: string): PasswordGenerator {
	return new algorithmClassMap[algorithm](token);
};
