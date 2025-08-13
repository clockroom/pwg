import PasswordGenerator from './password-generator';

export default class PinGenerator extends PasswordGenerator {

	constructor(token: string)
	{
		super(token, [0,0,0,0], false);
	}

};
