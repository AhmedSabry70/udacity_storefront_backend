import supertest from 'supertest';
import UserStore from '../../models/User';
import Client from '../../database';
import Order, { OrderProduct } from '../../types/orderType';
import User from '../../types/userType';
import app from '../../index';
import ProductStore from '../../models/Product';
import Product from '../../types/productType';
const userStore = new UserStore();
const productStore = new ProductStore();
const request = supertest(app);
let token = '';
let newU: User;
let newO: Order;
let newP: Product;

describe('ORDERS API Endpoints', () => {
	beforeAll(async () => {
		const nU = await userStore.create({
			user_name: 'userTesting',
			first_name: 'Ahmed',
			last_name: 'Sabry',
			email: 'A.Sabry@info.com',
			password: 'test123',
		} as User);
		//const createNewP = await productStore.create(newP);
		newU = nU;
		const nP = await productStore.create({
			name: 'T-shirt 1',
			price: 20.22,
			category: 'mens clothes',
		});
		newP = nP;
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
		const conn = await Client.connect();
		const sql = 'DELETE FROM orders';
		const sqlP = 'DELETE FROM products;';
		const sqlU = 'DELETE FROM users;';

		await conn.query(sql);
		await conn.query(sqlP);
		await conn.query(sqlU);
		conn.release();
	});

	describe('ORDER CRUD API ENDPOINT', () => {
		it(' ==> CREATE / ROUTE RETURN STATUS(200) and NEW ORDER', async () => {
			const createO = await request
				.post('/orders/')
				.set({
					'Content-type': 'application/json',
					Authorization: 'Bearer ' + token,
				})
				.send({
					status: 'completed',
					user_id: newU.id,
				});
			newO = createO.body.data;
			expect(createO.status).toBe(200);
			expect(createO.body.data).toEqual({
				id: createO.body.data.id,
				status: 'completed',
				user_id: newU.id as string,
			} as Order);
		});

		it('==> INDEX ALL ORDERS / ROUTE SHOULD RETURN STATUS (200) & LIST OF orders', async () => {
			const listO = await request.get('/orders/').set({
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + token,
			});
			const orders = listO.body.data;
			expect(listO.status).toBe(200);
			expect(orders.length).toBe(1);
		});
		it('==> SHOW ONE ORDERS BY ID / ROUTE SHOULD RETURN A TARGET ORDERS', async () => {
			const showO = await request.get(`/orders/${newO.id}`).set({
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + token,
			});
			const product = showO.body.data;
			expect(showO.status).toBe(200);
			expect(product.id).toBe(newO.id);
		});
		it('==> UPDATE ORDERS  / ROUTE should return res.status(200) and update a ORDERS', async () => {
			const updateO = await request
				.patch(`/orders/${newO.id}`)
				.set('Authorization', 'Bearer ' + token)
				.send({
					status: 'active',
					user_id: newU.id,
				} as Order);
			expect(updateO.status).toBe(200);
			expect(updateO.body.data).toEqual({
				id: newO.id as string,
				status: 'active',
				user_id: newU.id,
			});
		});
		it('==> DELETE ORDERS BY ID / ROUTE should return res.status(200) ', async () => {
			const deletO = await request
				.delete(`/orders/${newO.id}`)
				.set('Authorization', 'Bearer ' + token);
			expect(deletO.status).toBe(200);
		});
	});
});
