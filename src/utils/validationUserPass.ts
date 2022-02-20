import bcrypt from 'bcrypt';
import config from '../config';
import { QueryResult } from 'pg';

//compare the password which intered when user login
const passUserValid = (
	trueUser: QueryResult,
	password: string
): boolean | undefined => {
	if (trueUser.rows.length) {
		// password that comeback from database which is hashed
		const { password: hashPassword } = trueUser.rows[0];
		// encrption   func make uncrption with the come fron database and the pepper
		//then if it return ture that meaning the user enter correct password and go next step
		const isPasswordValid = bcrypt.compareSync(
			`${password}${config.bcrypt_pass}`,
			hashPassword
		);
		// isPasswordValid function return true so goahead and continue your database query
		return isPasswordValid;
	}
};

export default passUserValid;
