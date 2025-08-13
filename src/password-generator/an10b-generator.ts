import PasswordGenerator from './password-generator';

export default class An10bGenerator extends PasswordGenerator {

	constructor(token: string)
	{
		super(token, [4,5,6,4,5,6,4,5,6,5], false);
	}

};
