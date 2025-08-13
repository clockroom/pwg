import PasswordGenerator from './password-generator';

export default class SignatureGenerator extends PasswordGenerator {

	constructor(token: string)
	{
		super(token, [6,4,6,4,6,6,4,6,4,6], false);
	}

};
