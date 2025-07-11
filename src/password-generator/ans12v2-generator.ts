import PasswordGenerator from './password-generator';

export default class extends PasswordGenerator {

	constructor(token: string)
	{
		super(token, [0,0,1,1,1,1,1,1,2,2,2,7], false, 2);
	}

};
