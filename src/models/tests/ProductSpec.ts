import ProductStore from '../Product';
import Client from '../../database';
import Product from '../../types/productType';
import express from 'express';
import app from '../../index';
app.use(express.json());
const productStore = new ProductStore();

describe('PRODUCT Model', () => {
	describe('should have CRUD methods', () => {
		it('should have create user methode...', () => {
			expect(productStore.create).toBeDefined();
		});
		it('should have index user methode...', () => {
			expect(productStore.index).toBeDefined();
		});
		it('should have show user methode...', () => {
			expect(productStore.show).toBeDefined();
		});
		it('should have update user methode...', () => {
			expect(productStore.update).toBeDefined();
		});
		it('should have delete user methode...', () => {
			expect(productStore.delete).toBeDefined();
		});
	});

	describe('Products MODEL Logic', () => {
		const newP = {
			name: 'T-shirt 1',
			price: 17,
			category: 'mens clothes',
		} as Product;

		const deleteT = async () => {
			const conn = await Client.connect();
			const sql = 'DELETE FROM products;';
			await conn.query(sql);
			conn.release();
		};
		beforeAll(async () => {
			deleteT();
			const createNewP = await productStore.create(newP);
			newP.id = createNewP.id;
		});

		afterAll(async () => {
			deleteT();
		});
		describe('Product MODEL Logic', () => {
			describe(' Create Product MODEL Logic', () => {
				it('cerate method should return new Product', async () => {
					const createPr = await productStore.create({
						name: 'T-shirt 2',
						price: 19,
						category: 'mens clothes',
					});
					expect(createPr).toBeTruthy;
					const { id, name, price, category } = createPr;
					expect(id).toEqual(createPr.id);
					expect(name).toEqual('T-shirt 2');
					expect(category).toEqual('mens clothes');
				});
			});
			describe('Index Product METHOD MODEL Logic', () => {
				it('SHOULD RETURN  LIST OF PRODUCTS', async () => {
					const listP = await productStore.index();

					expect(listP.length).toBe(2);
				});
			});

			describe('==> SHOW ONE product BY ID METHOD MODEL Logic', () => {
				it('SHOULD RETURN A TARGET product', async () => {
					const showP = await productStore.show(newP.id as string);
					expect(showP).toBeTrue;
					expect(showP.id).toBe(newP.id);
					const { id, name, category } = showP;
					expect(id).toEqual(showP.id);
					expect(name).toEqual('T-shirt 1');
					expect(category).toEqual('mens clothes');
				});
			});

			describe('==> UPDATE product METHOD MODEL Logic', () => {
				it('should return  update a a Product', async () => {
					const updateP = await productStore.update({
						id: newP.id,
						name: 'r Moto Biker Jacket',
						price: 20,
						category: 'womens clothes',
					});

					const { id, name, category } = updateP;
					expect(updateP).toBeTruthy;
					expect(id).toEqual(newP.id);
					expect(name).toEqual('r Moto Biker Jacket');
					expect(category).toEqual('womens clothes');
				});
			});

			describe('==> DELETE product BY ID MODEL Logic', () => {
				it('should delete target a Product with ID ', async () => {
					const deletP = await productStore.delete(newP.id as string);

					expect(deletP).toBeTruthy;
					expect(deletP.id).toBe(newP.id);
				});
			});
		});
	});
});

// });

// 	describe('Test PRODUCT MODEL methods exists', () => {
// 		it('should have an Get Many Users method', () => {
// 			expect(userModel.index).toBeDefined();
// 		});

// 		it('should have a Get One User method', () => {
// 			expect(userModel.show).toBeDefined();
// 		});

// 		it('should have a Create User method', () => {
// 			expect(userModel.create).toBeDefined();
// 		});

// 		it('should have a Update User method', () => {
// 			expect(userModel.update).toBeDefined();
// 		});

// 		it('should have a Delete User method', () => {
// 			expect(userModel.delete).toBeDefined();
// 		});
// 	});

// 	describe('Test PRODUCT Model Logic', () => {
// 		const userModel = new UserModel();
// 		const dddd = {
// 			name: 'userName',
// 			price: 30,
// 			category: 'lastName',
// 		} as User;
// 		beforeAll(async () => {
// 			const bb = await userModel.create(dddd);
// 			dddd.id = bb.id;
// 		});

// 		afterAll(async () => {
// 			const conn = await db.connect();
// 			const sql = 'DELETE FROM products';
// 			await conn.query(sql);
// 			conn.release();
// 		});

// 		it('Create  return a New PRODUCT', async () => {
// 			const createdUser = await userModel.create({
// 				name: 'T-shirt 2',
// 				price: 1000,
// 				category: 'womens clothing',
// 			} as User);
// 			// expect(createdUser).toEqual({
// 			// 	id: createdUser.id,
// 			// 	name: 'T-shirt 2',
// 			// 	price: 1000 ,
// 			// 	category: 'womens clothing',
// 			// } as User);
// 			expect(createdUser?.id).toBe(createdUser?.id);
// 			expect(createdUser?.name).toBe(createdUser?.name);
// 			expect(createdUser).toBeTruthy;
// 		});

// 		it('index return All available users in DB', async () => {
// 			const users = await userModel.index();
// 			expect(users.length).toBe(2);
// 		});

// 		it('Get One method should return testUser when called with ID', async () => {
// 			const returnedUser = await userModel.show(dddd.id as string);

// 			expect(returnedUser).toEqual({
// 				id: dddd.id,
// 				name: 'userName',
// 				price: 30,
// 				category: 'lastName',
// 			} as User);
// 			expect(returnedUser.id).toBe(dddd.id);
// 			expect(returnedUser.name).toBe(dddd.name);
// 			//expect(returnedUser.price).toBe(dddd.price);
// 			expect(returnedUser.category).toBe(dddd.category);
// 		});

// 		it('Update One method should return a user with edited attributes', async () => {
// 			const updatedUser = await userModel.update({
// 				...dddd,
// 				name: 'testUser Updated',
// 				price: 200,
// 				category: 'mens clothes',
// 			});
// 			expect(updatedUser).toBeTruthy;
// 			expect(updatedUser.id).toBe(dddd.id);
// 			expect(updatedUser.name).toBe('testUser Updated');
// 			expect(updatedUser.category).toBe('mens clothes');
// 		});

// 		it('Delete One method should delete user from DB', async () => {
// 			const deletedUser = await userModel.delete(dddd.id as string);

// 			expect(deletedUser).toBeTruthy;
// 		});
// 	});
// });
