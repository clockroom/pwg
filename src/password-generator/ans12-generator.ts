import PasswordGenerator from './password-generator';

export default class extends PasswordGenerator {

	constructor(token: string)
	{
		super(token, [3,4,5,6,3,4,5,6,4,5,6,5], false);
	}

};
