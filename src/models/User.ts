import Client from '../database';
import hashPass from '../utils/hashPassword';
import validuser from '../utils/validationUserPass';
import User from './../types/userType';

export class UserStore {
	//get all users
	async index(): Promise<User[]> {
		try {
			//open connection with db
			const conn = await Client.connect();
			// runn query
			const sql =
				'SELECT id, user_name, first_name, last_name, email FROM users';

			const result = await conn.query(sql);
			// close connenction
			conn.release();
			//return users index
			return result.rows;
		} catch (error) {
			throw new Error(`Error cannot get users ,${(error as Error).message}`);
		}
	}

	//get specific user
	async show(id: string): Promise<User> {
		try {
			//open connection with db
			const conn = await Client.connect();
			// runn query
			const sql =
				'SELECT id, user_name, first_name, last_name, email FROM users WHERE id=$1';

			const result = await conn.query(sql, [id]);
			// close connenction
			conn.release();
			//return specific user
			return result.rows[0];
		} catch (error) {
			throw new Error(`could not find user ${id}, ${(error as Error).message}`);
		}
	}

	// create user
	async create(u: User): Promise<User> {
		try {
			const conn = await Client.connect();
			const checkEmailExists = await Client.query(
				'SELECT e FROM users e WHERE  e.email =$1',
				[u.email]
			);
			const emailExists = checkEmailExists.rows[0];
			if (emailExists)
				throw new Error(
					`Could not add user with Email :${u.email}. already exists.`
				);
			conn.release();
		} catch (error) {
			throw new Error(
				`Could not add user with Email :${u.email}. already exists, ${
					(error as Error).message
				}`
			);
		}

		try {
			//open connection with db
			const conn = await Client.connect();
			// runn query

			const sql =
				'INSERT INTO users ( user_name, first_name, last_name, email, password) VALUES ($1,$2,$3,$4,$5) returning id, user_name, first_name, last_name, email';

			const result = await conn.query(sql, [
				u.user_name,
				u.first_name,
				u.last_name,
				u.email,
				hashPass(u.password),
			]);

			// close connenction
			conn.release();

			//return created user
			return result.rows[0];
		} catch (error) {
			throw new Error(
				`unable to create user:${u.user_name}, ${(error as Error).message}`
			);
		}
	}

	//update user
	async update(u: User): Promise<User> {
		try {
			//open connection with db
			const conn = await Client.connect();
			// runn query

			const sql =
				'UPDATE users SET  user_name=$1, first_name=$2, last_name=$3,email=$4, password=$5 WHERE id=$6 RETURNING id, user_name, first_name, last_name, email';

			const result = await conn.query(sql, [
				u.user_name,
				u.first_name,
				u.last_name,
				u.email,
				hashPass(u.password),
				u.id,
			]);
			// close connenction
			conn.release();
			//return specific user
			return result.rows[0];
		} catch (error) {
			throw new Error(
				`could not updata user: ${u.user_name}, ${(error as Error).message}`
			);
		}
	}

	//delet user
	async delete(id: string): Promise<User> {
		try {
			//open connection with db
			const conn = await Client.connect();
			// runn query
			const sql =
				'DELETE FROM users WHERE id=($1) returning id, user_name, first_name, last_name, email';

			const result = await conn.query(sql, [id]);
			// close connenction
			conn.release();
			//return specific user
			return result.rows[0];
		} catch (error) {
			throw new Error(
				`could not delet user: ${id}, ${(error as Error).message}`
			);
		}
	}

	// authenticate user
	async authenticate(email: string, password: string): Promise<User | null> {
		try {
			//open connection with db
			const conn = await Client.connect();

			//frist step select hashedpassword password that included with this email in database then unhashed it to compare with the password has been  ontered in frontend to know if it aleady existe or not with this email
			// runn query
			const sql = 'SELECT password FROM users WHERE email=$1';
			const result = await conn.query(sql, [email]);

			// validition password callback func and un hashed target password
			const isValid = validuser(result, password);
			if (isValid) {
				const userInfo = await conn.query(
					'SELECT id, user_name, first_name, last_name, email FROM users WHERE email=($1)',
					[email]
				);
				return userInfo.rows[0];
			}
			conn.release();
			return null;
		} catch (error) {
			throw new Error(`Unable to login: ${email}, ${(error as Error).message}`);
		}
	}
}

export default UserStore;
