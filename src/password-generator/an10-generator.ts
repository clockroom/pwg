import PasswordGenerator from './password-generator';

export default class An10Generator extends PasswordGenerator {

	constructor(token: string)
	{
		super(token, [0,0,0,0,1,1,1,2,2,2]);
	}

};
