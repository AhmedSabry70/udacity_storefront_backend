import supertest from 'supertest';
import Clinte from '../../database';
import app from '../../index';
import ProductStore from '../../models/Product';
import Product from '../../types/productType';
import UserStore from '../../models/User';
import User from '../../types/userType';

const productStore = new ProductStore();
const userStore = new UserStore();
const request = supertest(app);
let token = '';

describe('PRODUCT API Endpoints', () => {
	const newUser = {
		user_name: 'userTesting',
		first_name: 'Ahmed',
		last_name: 'Sabry',
		email: 'A.Sabry@info.com',
		password: 'test123',
	} as User;

	const newP = {
		name: 'T-shirt 1',
		price: 20.22,
		category: 'mens clothes',
	} as Product;

	beforeAll(async () => {
		await userStore.create(newUser);
		const createNewP = await productStore.create(newP);
		newP.id = createNewP.id;

		const auth = await request
			.post('/users/login')
			.set('Content-type', 'application/json')
			.send({
				email: 'A.Sabry@info.com',
				password: 'test123',
			});
		const { accessToken } = auth.body.data;
		token = accessToken;
	});

	afterAll(async () => {
		const conn = await Clinte.connect();
		const sql = 'DELETE FROM products';
		const sqlU = 'DELETE FROM users;';
		await conn.query(sql);
		await conn.query(sqlU);
		conn.release();
	});

	describe('CRUD API ENDPOINT', () => {
		describe('==> CREATE / ROUTE', () => {
			it(' RETURN STATUS(200) and NEW PRODUCT', async () => {
				const createP = await request
					.post('/products/')
					.set({
						'Content-type': 'application/json',
						Authorization: 'Bearer ' + token,
					})

					//	'Content-type': 'application/json',

					.send({
						name: 'Removable Hooded Faux Leather Moto Biker Jacket',
						price: 29.95,
						category: 'womens clothing',
					} as Product);
				expect(createP.status).toBe(200);
				expect(createP.body.data).toEqual({
					id: createP.body.data.id,
					name: 'Removable Hooded Faux Leather Moto Biker Jacket',
					price: '29.95',
					category: 'womens clothing',
				});
			});

			it('VALIDATION RETURN ERROE WITH  INVALID PRODUCT INPUTS', async () => {
				const createP = await request
					.post('/users/')
					.set({
						'Content-type': 'application/json',
						Authorization: 'Bearer ' + token,
					})
					.send({
						name: 'Removable Hooded Faux Leather Moto Biker Jacket',
						price: 29.95,
						category: '',
					});

				expect(createP.status).not.toBe(200);
			});
		});

		describe('==> INDEX ALL Product / ROUTE', () => {
			it('SHOULD RETURN STATUS (200) & LIST OF PRODUCTS', async () => {
				const listP = await request.get('/products/').set({
					Authorization: 'Bearer ' + token,
				});
				const products = listP.body.data;
				expect(listP.status).toBe(200);
				expect(products.length).toBe(2);
			});
		});
		describe('==> SHOW ONE product BY ID / ROUTE', () => {
			it('SHOULD RETURN A TARGET product', async () => {
				const showP = await request.get(`/products/${newP.id}`).set({
					Authorization: 'Bearer ' + token,
				});
				const product = showP.body.data;
				expect(showP.status).toBe(200);
				expect(product.id).toBe(newP.id);
			});
		});
		describe('==> UPDATE product  / ROUTE', () => {
			it('should return res.status(200) and update a product', async () => {
				const updateP = await request
					.patch(`/products/${newP.id}`)
					.set('Authorization', 'Bearer ' + token)
					.send({
						name: 'r Moto Biker Jacket',
						price: 20,
						category: 'mens clothes',
					});

				expect(updateP.status).toBe(200);
				const { id, name, price, category } = updateP.body.data;
				expect(updateP.status).toBe(200);
				expect(id).toEqual(newP.id);
				expect(name).toEqual('r Moto Biker Jacket');
				expect(price).toEqual('20');
				expect(category).toEqual('mens clothes');
			});
		});
		describe('==> DELETE product BY ID / ROUTE', () => {
			it('should return res.status(200) ', async () => {
				const deletP = await request
					.delete(`/products/${newP.id}`)
					.set('Authorization', 'Bearer ' + token);
				expect(deletP.status).toBe(200);
			});
		});
	});
});
