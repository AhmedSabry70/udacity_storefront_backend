import UserStore from '../User';
import Client from '../../database';
import User from '../../types/userType';

//import config from '../../config';

const userStore = new UserStore();

describe('Authentication endpoint', () => {
	it('should have create user methode...', () => {
		expect(userStore.create).toBeDefined();
	});
	it('should have authent user methode...', () => {
		expect(userStore.authenticate).toBeDefined();
	});
	it('should have index user methode...', () => {
		expect(userStore.index).toBeDefined();
	});
	it('should have show user methode...', () => {
		expect(userStore.show).toBeDefined();
	});
	it('should have update user methode...', () => {
		expect(userStore.update).toBeDefined();
	});
});

describe('Test USER MODEL Logic', () => {
	const newUser: User = {
		user_name: 'userName',
		first_name: 'fristNAmed',
		last_name: 'lastName',
		email: 'db-test@test.com',
		password: 'password123',
	};

	beforeAll(async () => {
		const creatNewUser = await userStore.create(newUser);
		newUser.id = creatNewUser.id;
	});

	afterAll(async () => {
		const conn = await Client.connect();
		const sql = 'DELETE FROM users';
		await conn.query(sql);
		conn.release();
	});
	describe('Test Authentication Logic', () => {
		it('authent method should return the authentd user', async () => {
			const authentication = await userStore.authenticate(
				newUser.email,
				newUser.password
			);
			expect(authentication?.id).toBe(newUser.id);
			expect(authentication?.email).toBe(newUser.email);
			expect(authentication?.user_name).toBe(newUser.user_name);
			expect(authentication?.first_name).toBe(newUser.first_name);
			expect(authentication?.last_name).toBe(newUser.last_name);
		});
		it('authent method should return toBeFalsy for wrong credentials', async () => {
			const authentication = await userStore.authenticate(
				'mohammed@elzanaty.com',
				'fake-password'
			);
			expect(authentication).toBeFalsy;
		});
	});
	describe('Test Create USER METHOD MODEL Logic', () => {
		//it('frist check not existe email in database method should return the fale ',async()=>{

		it('cerate method should return new user', async () => {
			const createNewUser = await userStore.create({
				user_name: 'userName2',
				first_name: 'fristNAmed2',
				last_name: 'lastName2',
				email: 'db-test2@test2.com',
				password: 'password1232',
			});

			expect(createNewUser.id).toEqual(createNewUser.id);
			expect(createNewUser.email).toEqual('db-test2@test2.com');
			expect(createNewUser.user_name).toEqual('userName2');
			expect(createNewUser.first_name).toEqual('fristNAmed2');
			expect(createNewUser.last_name).toEqual('lastName2');
		});
		// it('cerate method check existe email in database method should return toBeFalsy so(CANT CREATE THAT USER email twice)', async () => {
		//   const createNewUser = async () => {
		//     await userStore.create(newUser);
		//   };

		//   //expect(createNewUser).toEqual(
		//   //   `Could not add user with Email :${newUser.email}. already exists.`
		//   // );
		//   expect(createNewUser).toThrowError(
		//     `Could not add user with Email :${newUser.email}. already exists.`
		//   );
		// });
	});

	describe('Test Index USERS METHOD MODEL Logic', () => {
		it('index method should return all users in database', async () => {
			const getAllUSers = await userStore.index();
			expect(getAllUSers.length).toBe(2);
		});
	});

	describe('Test Show USER METHOD MODEL Logic', () => {
		it('show method should return a user', async () => {
			const getUSer = await userStore.show(newUser.id as string);
			expect(getUSer?.id).toBe(newUser.id);
			expect(getUSer?.email).toBe(newUser.email);
			expect(getUSer?.user_name).toBe(newUser.user_name);
			expect(getUSer?.first_name).toBe(newUser.first_name);
			expect(getUSer?.last_name).toBe(newUser.last_name);
		});
	});
	describe('Test update USER METHOD MODEL Logic', () => {
		it('update method should return a user with edtinig verison', async () => {
			const getUSer = await userStore.update({
				id: newUser.id,
				user_name: 'userNameNewVersion',
				first_name: 'fristNAmedNewVersion',
				last_name: 'lastName2NewVersion',
				email: 'db-test2NewVersion@test2.com',
				password: 'password1232',
			} as User);
			expect(getUSer?.id).toBe(newUser.id);
			expect(getUSer.user_name).toEqual('userNameNewVersion');
			expect(getUSer.first_name).toEqual('fristNAmedNewVersion');
			expect(getUSer.last_name).toEqual('lastName2NewVersion');
			expect(getUSer.email).toEqual('db-test2NewVersion@test2.com');
		});
	});
	describe('Test delete USER METHOD MODEL Logic', () => {
		it('delete method should delete target a user with ID', async () => {
			const deleteUSer = await userStore.delete(newUser.id as string);
			expect(deleteUSer.id).toBe(newUser.id);
		});

		// it('delete method should dont completed with invalid ID', async () => {
		//   const deleteUSer = await userStore.delete(
		//     'cfdf0aef-6dc5-48d5-8767-6e492886fdbb-dddd'
		//   );

		//   expect(deleteUSer.user_name).toBeNull;
		//   // expect(deleteUSer).toBeFalse;
		//   // expect(deleteUSer).toBeNull;
		//   // expect(deleteUSer).toBeFalsy;
		//   // expect(deleteUSer).toBeUndefined;
		//   // expect(deleteUSer).toBeTruthy;
		// });
	});
});
