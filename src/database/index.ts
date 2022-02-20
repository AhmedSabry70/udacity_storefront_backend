import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import config from '../config';
dotenv.config();

// const {
//   POSTGRES_PORT,
//   POSTGRES_HOST,
//   POSTGRES_TEST_DB,
//   POSTGRES_USER,
//   POSTGRES_PASSWORD,
//   NODE_ENV,
// } = process.env;

let Client: Pool;

if (config.evn === 'dev') {
	Client = new Pool({
		host: config.db_host,
		database: config.db_dev,
		user: config.db_user,
		password: config.db_password,
		port: parseInt(config.db_port as string, 10),
	});
} else {
	Client = new Pool({
		host: config.db_host,
		database: config.db_test,
		user: config.db_user,
		password: config.db_password,
		port: parseInt(config.db_port as string, 10),

		//max: 4,
	});
}

Client.on('error', (error: Error) => {
	console.error(error.message);
});

export default Client;
