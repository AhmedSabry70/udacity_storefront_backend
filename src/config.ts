import * as dotenv from 'dotenv';
dotenv.config();

const {
	PORT,
	POSTGRES_PORT,
	POSTGRES_HOST,
	POSTGRES_DB,
	POSTGRES_TEST_DB,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	BCRYPT_PASSWORD,
	SALT_ROUNDS,
	TOKEN_SCRET,
	NODE_ENV,
} = process.env;

export default {
	port: PORT,
	db_port: POSTGRES_PORT,
	db_host: POSTGRES_HOST,
	db_dev: POSTGRES_DB,
	db_test: POSTGRES_TEST_DB,
	db_user: POSTGRES_USER,
	db_password: POSTGRES_PASSWORD,
	saltPass: SALT_ROUNDS,
	bcrypt_pass: BCRYPT_PASSWORD,
	tokenSC: TOKEN_SCRET,
	evn: NODE_ENV,
};
