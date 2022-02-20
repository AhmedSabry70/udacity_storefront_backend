import UserStore from '../User';
import OrderStore from '../Order';
import ProductStore from '../Product';
import Client from '../../database';
import Order, { OrderProduct } from '../../types/orderType';
import User from '../../types/userType';
import Product from '../../types/productType';
import express from 'express';
import app from '../../index';
app.use(express.json());
const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

describe('ORDER Model', () => {
	describe('should have CRUD methods', () => {
		it('should have create user methode...', () => {
			expect(orderStore.create).toBeDefined();
		});
		it('should have index user methode...', () => {
			expect(orderStore.index).toBeDefined();
		});
		it('should have show user methode...', () => {
			expect(orderStore.show).toBeDefined();
		});
		it('should have update user methode...', () => {
			expect(orderStore.update).toBeDefined();
		});
		it('should have delete user methode...', () => {
			expect(orderStore.delete).toBeDefined();
		});
	});

	describe('Products MODEL Logic', () => {
		let newU: User;
		let newO: Order;
		let newP: Product;
		beforeAll(async () => {
			const createNewU = await userStore.create({
				user_name: 'userName',
				first_name: 'fristNAmed',
				last_name: 'lastName',
				email: 'db-test@test.com',
				password: 'password123',
			} as User);
			newU = createNewU;
		});

		afterAll(async () => {
			const conn = await Client.connect();
			const sqlu = 'DELETE FROM users;';
			const sqlo = 'DELETE FROM orders;';
			await conn.query(sqlo);
			await conn.query(sqlu);
			conn.release();
		});
		describe('ORDER MODEL Logic', () => {
			describe(' Create ORDER MODEL Logic', () => {
				it('cerate method should return new ORDER', async () => {
					const createO = await orderStore.create({
						status: 'active',
						user_id: newU.id as string,
					});
					newO = createO;
					expect(createO).toBeTruthy;

					expect(createO).toEqual({
						id: createO.id,
						status: 'active',
						user_id: newU.id as string,
					});
				});
			});

			describe('Index ORDER METHOD MODEL Logic', () => {
				it('SHOULD RETURN  LIST OF ORDER', async () => {
					const listO = await orderStore.index();

					expect(listO.length).toBe(1);
				});
			});

			describe('==> SHOW ONE ORDER BY ID METHOD MODEL Logic', () => {
				it('SHOULD RETURN A TARGET ORDER', async () => {
					const showO = await orderStore.show(newO.id as string);
					expect(showO).toBeTrue;

					expect(showO).toEqual({
						id: newO.id,
						status: 'active',
						user_id: newU.id as string,
					});
				});
			});

			describe('==> UPDATE ORDER METHOD MODEL Logic', () => {
				it('should return  update a a ORDER', async () => {
					const updateO = await orderStore.update({
						id: newO.id,
						status: 'active',
						user_id: newU.id as string,
					});

					expect(updateO).toBeTruthy;
					expect(updateO).toEqual({
						id: newO.id,
						status: 'active',
						user_id: newU.id as string,
					});
				});
			});

			describe('==> DELETE ORDER BY ID MODEL Logic', () => {
				it('should delete target a ORDER with ID ', async () => {
					const deletO = await orderStore.delete(newO.id as string);

					expect(deletO).toBeTruthy;
					expect(deletO.id).toBe(newO.id);
				});
			});
		});
	});
});
