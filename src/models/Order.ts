import Client from '../database';
import Order, { OrderProduct } from '../types/orderType';

export class OrderProductStore {
	// Get all orders in database
	async index(): Promise<Order[]> {
		try {
			const conn = await Client.connect();
			const sql = 'SELECT * FROM orders';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`cannot get orders ,${(err as Error).message}`);
		}
	}

	// Get a orders by ID
	async show(id: string): Promise<Order> {
		try {
			const conn = await Client.connect();
			const sql = 'SELECT * FROM orders WHERE id=$1';
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not find order ${id}, ${(err as Error).message}`);
		}
	}

	// Get current order by user id
	async OrderByUserId(userId: string): Promise<Order> {
		try {
			const conn = await Client.connect();
			const sql = 'SELECT * FROM orders WHERE user_id =$1 ORDER BY id';
			const result = await conn.query(sql, [userId]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(
				`Could not get current order by ${userId}, ${(err as Error).message}`
			);
		}
	}

	// create New order
	async create(o: Order): Promise<Order> {
		try {
			const conn = await Client.connect();
			const sql =
				'INSERT INTO orders ( status, user_id) VALUES ($1,$2) RETURNING *';
			// @ts-ignore

			const result = await conn.query(sql, [o.status, o.user_id]);

			conn.release();

			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not add new product ${o.status}. Error: ${err}`);
		}
	}

	// update order by ID
	async update(o: Order): Promise<Order> {
		try {
			const conn = await Client.connect();
			const sql =
				'UPDATE orders SET status=$1, user_id=$2 WHERE id=$3 RETURNING *';
			// @ts-ignore

			const result = await conn.query(sql, [o.status, o.user_id, o.id]);

			const order: Order = result.rows[0];
			conn.release();

			return order;
		} catch (err) {
			throw new Error(`Could not update order ${o}, ${(err as Error).message}`);
		}
	}

	// Delete order by ID
	async delete(id: string): Promise<Order> {
		try {
			const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
			// @ts-ignore
			const conn = await Client.connect();

			const result = await conn.query(sql, [id]);

			const order: Order = result.rows[0];

			conn.release();

			return order;
		} catch (err) {
			throw new Error(
				`Could not delete orders ${id}, ${(err as Error).message}`
			);
		}
	}

	// Add Product To Cart
	async addProduct(
		quantity: number,
		order_id: string,
		product_id: string
	): Promise<OrderProduct> {
		// get order to see if it is open
		try {
			const ordersql = 'SELECT * FROM orders WHERE id=$1';
			//@ts-ignore
			const conn = await Client.connect();
			const result = await conn.query(ordersql, [order_id]);
			const order = result.rows[0];

			if (order.status !== 'active') {
				throw new Error(
					`Could not add product ${product_id} to order ${product_id} because order status is ${order.status}`
				);
			}
			conn.release();
		} catch (err) {
			throw new Error(
				`Could not add product ${product_id} to order ${product_id}: ${err}`
			);
		}

		try {
			const sql =
				'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
			//@ts-ignore
			const conn = await Client.connect();

			const result = await conn.query(sql, [quantity, order_id, product_id]);

			const order = result.rows[0];

			conn.release();

			return order;
		} catch (err) {
			throw new Error(
				`Could not add product ${product_id} to order ${product_id}: ${err}`
			);
		}
	}

	// select completed order by user id
	async CompletedOrdersbyuser(userId: string): Promise<Order[]> {
		try {
			const status = 'complete';
			const sql = 'SELECT * FROM orders WHERE user_id = $1 AND status = $2';
			//@ts-ignore
			const conn = await Client.connect();
			const result = await conn.query(sql, [userId, status]);
			const order = result.rows;
			conn.release();
			return order;
		} catch (err) {
			throw new Error(`Could not get completed orders. by user  ${userId}`);
		}
	}
}

export default OrderProductStore;
