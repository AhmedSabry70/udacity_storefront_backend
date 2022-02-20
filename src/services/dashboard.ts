import Client from '../database';

export class DashboardQueries {
	// Get all products that have been included in orders
	// Get all users that have been included with orders
	async usersWithOrders(): Promise<
		{ name: string; status: string; id: string }[]
	> {
		try {
			//@ts-ignore
			const conn = await Client.connect();
			const sql =
				'SELECT user_name, orders.status, orders.id FROM users INNER JOIN orders ON users.id = orders.user_id group BY orders.id,user_name';

			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`unable get products and orders: ${err}`);
		}
	}

	// Get all products that have been included in orders
	async productsInOrders(): Promise<
		{ name: string; price: number; order_id: string }[]
	> {
		try {
			//@ts-ignore
			const conn = await Client.connect();
			const sql =
				'SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id = order_products.product_id';

			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`unable get products and orders: ${err}`);
		}
	}

	//Adding the ORDER By
	// Get all users that have made orders
	async fiveMostExpensive(): Promise<{ name: string; price: number }[]> {
		try {
			//@ts-ignore
			const conn = await Client.connect();
			const sql =
				'SELECT name, price FROM products ORDER BY price DESC LIMIT 5';

			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`unable get products by price: ${err}`);
		}
	}
}

export default DashboardQueries;
