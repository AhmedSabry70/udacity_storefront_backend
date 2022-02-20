import { array } from 'joi';
import supertest from 'supertest';
import Clinte from '../../database';
import app from '../../index';
import UserStore from '../../models/User';
import User from '../../types/userType';

const userStore = new UserStore();
const request = supertest(app);
let token = '';

describe('User API Endpoints', () => {
	const newUser = {
		user_name: 'userTesting',
		first_name: 'Ahmed',
		last_name: 'Sabry',
		email: 'A.Sabry@info.com',
		password: 'test123',
	} as User;

	beforeAll(async () => {
		const createdUser = await userStore.create(newUser);
		newUser.id = createdUser.id;
	});

	afterAll(async () => {
		const conn = await Clinte.connect();

		const sql = 'DELETE FROM users;';
		await conn.query(sql);
		conn.release();
	});

	describe('Test Authenticate methods', () => {
		it('should be able to authenticate to get token', async () => {
			const auth = await request
				.post('/users/login')
				.set('Content-type', 'application/json')
				.send({
					email: 'A.Sabry@info.com',
					password: 'test123',
				});
			expect(auth.status).toBe(200);
			const { id, accessToken } = auth.body.data;
			expect(id).toBe(newUser.id);

			token = accessToken;
		});

		it('FAILD TO AUTHENTICATE WITH RWONG EMAIL', async () => {
			const auth = await request
				.post('/api/users/login')
				.set('Content-type', 'application/json')
				.send({
					email: 'invalid@email.com',
					password: 'test123',
				});
			expect(auth.status).not.toBe(200);
		});
	});

	describe('CRUD API ENDPOINT', () => {
		describe('==> REGISTER / ROUTE', () => {
			it(' RETURN STATUS(200) and NEW USER', async () => {
				const register = await request
					.post('/users/signup')
					.set({
						'Content-type': 'application/json',
						Authorization: 'Bearer ' + token,
						role: 'admin',
					})
					.send({
						user_name: 'userTesting22',
						first_name: 'Ahmed22',
						last_name: 'Sabry22',
						email: '22A.Sabry@info22.com',
						password: 'test12322',
					});
				const { id, user_name, first_name, last_name, email } =
					register.body.data;
				expect(register.status).toBe(200);
				expect(id).toEqual(id);
				expect(user_name).toEqual('userTesting22');
				expect(first_name).toEqual('Ahmed22');
				expect(last_name).toEqual('Sabry22');
				expect(email).toEqual('22A.Sabry@info22.com');
			});
			it(' WITHOUT ADMIN OR VALID TOKen RETURN ERROR ', async () => {
				const register = await request
					.post('/users/signup')
					.set({
						'Content-type': 'application/json',
						Authorization: 'Bearer ' + token,
					})
					.send({
						user_name: 'userTesting22',
						first_name: 'Ahmed22',
						last_name: 'Sabry22',
						email: '22A.Sabry@info22.com',
						password: 'test12322',
					});

				expect(register.status).not.toBe(200);
			});

			it('VALIDATION RETURN ERROE WITH  INVALID INPUTS', async () => {
				const register = await request
					.post('/users/signup')
					.set({
						'Content-type': 'application/json',
						Authorization: 'Bearer ' + token,
					})
					.send({
						user_name: '',
						first_name: 'Ahmed22',
						last_name: 'Sabry22',
						email: '',
						password: 'test12322',
					});

				expect(register.status).not.toBe(200);
			});
			it(' WITH EXIST EMAIL IN DB SHOULD RETURN ERORR', async () => {
				const register = await request
					.post('/users/signup')
					.set({
						'Content-type': 'application/json',
						Authorization: 'Bearer ' + token,
					})
					.send({
						user_name: 'userTesting22',
						first_name: 'Ahmed22',
						last_name: 'Sabry22',
						email: '22A.Sabry@info22.com',
						password: 'test12322',
					});

				expect(register.status).not.toBe(200);
			});
		});

		describe('==> INDEX ALL USER / ROUTE', () => {
			it('SHOULD RETURN STATUS (200) & LIST OF USERS', async () => {
				const listOF = await request
					.get('/users/')
					.set('Authorization', 'Bearer ' + token);
				const users = listOF.body.data;
				expect(listOF.status).toBe(200);
				expect(users.length).toBe(2);
			});
		});
		describe('==> SHOW ONE USER BY ID USER  / ROUTE', () => {
			it('SHOULD RETURN A TARGET USER', async () => {
				const show = await request
					.get(`/users/${newUser.id}`)
					.set('Authorization', 'Bearer ' + token);
				const users = show.body.data;
				expect(show.status).toBe(200);
				expect(users.id).toBe(newUser.id);
			});
		});
		describe('==> UPDATE USER  / ROUTE', () => {
			it('should return res.status(200) and update a user', async () => {
				const UPDATE = await request
					.patch(`/users/${newUser.id}`)
					.set('Authorization', 'Bearer ' + token)
					.send({
						user_name: 'upDate',
						first_name: 'upDate',
						last_name: 'upDate',
						email: 'A.Sabry@info.com',
						password: 'test123',
					});

				expect(UPDATE.status).toBe(200);
				const { id, user_name, first_name, last_name, email } =
					UPDATE.body.data;
				expect(UPDATE.status).toBe(200);
				expect(id).toEqual(newUser.id);
				expect(user_name).toEqual('upDate');
				expect(first_name).toEqual('upDate');
				expect(last_name).toEqual('upDate');
				expect(email).toEqual(newUser.email);
			});
		});
		describe('==> DELETE ONER BY ID USER  / ROUTE', () => {
			it('should return res.status(200) ', async () => {
				const deleteUser = await request
					.delete(`/users/${newUser.id}`)
					.set('Authorization', 'Bearer ' + token);
				expect(deleteUser.status).toBe(200);
			});
		});
	});
});
