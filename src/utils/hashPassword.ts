import bcrypt from 'bcrypt';
import config from '../config';

const { bcrypt_pass, saltPass } = config;
// function take user's password when singup and heshed it then push it to database
const hashPass = (password: string) => {
	const salt = parseInt(saltPass as string, 10);
	// return hash password to store in database
	return bcrypt.hashSync(`${password}${bcrypt_pass}`, salt);
};

export default hashPass;
