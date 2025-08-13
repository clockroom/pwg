import PasswordGenerator from './password-generator';

export default class An8Generator extends PasswordGenerator {

	constructor(token: string)
	{
		super(token, [0,0,0,0,1,1,2,2]);
	}

};
