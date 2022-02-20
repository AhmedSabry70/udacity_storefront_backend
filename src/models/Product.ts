//import { QueryResult } from 'pg';
import Client from '../database';
import Product from '../types/productType';

export class ProductStore {
	// Get all products in database
	async index(): Promise<Product[]> {
		try {
			const conn = await Client.connect();
			const sql = 'SELECT * FROM products';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (error) {
			throw new Error(`cannot get product ${error}`);
		}
	}

	// Get a product by ID
	async show(id: string): Promise<Product> {
		try {
			const conn = await Client.connect();
			const sql = 'SELECT * FROM products WHERE id=$1';
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (error) {
			throw new Error(`Could not find product ${id}. Error: ${error}`);
		}
	}

	// create New products
	async create(p: Product): Promise<Product> {
		try {
			const conn = await Client.connect();
			const sql =
				'INSERT INTO products ( name, price, category) VALUES ($1,$2,$3) RETURNING *';
			// @ts-ignore

			const result = await conn.query(sql, [p.name, p.price, p.category]);

			conn.release();

			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
		}
	}

	// update products by ID
	async update(p: Product): Promise<Product> {
		try {
			const conn = await Client.connect();
			//console.log(id);
			const sql =
				'UPDATE products SET name=$1, price=$2, category=$3  WHERE id=$4 RETURNING *';
			// @ts-ignore

			const result = await conn.query(sql, [p.name, p.price, p.category, p.id]);

			const product: Product = result.rows[0];
			conn.release();

			return product;
		} catch (err) {
			throw new Error(
				`'Could not update product ${p}'. ${(err as Error).message}`
			);
		}
	}

	// Delete products by ID
	async delete(id: string): Promise<Product> {
		try {
			const sql = 'DELETE FROM products WHERE id=($1) returning *';
			// @ts-ignore
			const conn = await Client.connect();

			const result = await conn.query(sql, [id]);

			const product: Product = result.rows[0];

			conn.release();

			return product;
		} catch (err) {
			throw new Error(
				`Could not delete product ${id}. ${(err as Error).message}`
			);
		}
	}

	// select product by category
	async category(category: string): Promise<Product[]> {
		try {
			const conn = await Client.connect();
			const sql = 'SELECT * FROM products WHERE category=$1';
			const result = await conn.query(sql, [category]);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(
				`Could not find product with category: ${category}. Error: ${err}`
			);
		}
	}
}

export default ProductStore;
