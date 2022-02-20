import { Response, Request, NextFunction } from 'express';
import OrderStore from '../models/Order';
import Order from '../types/orderType';
const orderstore = new OrderStore();

// Get all orders in database
export const index = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const orders = await orderstore.index();
		res.json({
			status: 'success',
			data: orders,
			message: 'this is the INDEX route',
		});
	} catch (err) {
		next(err);
	}
};

// Get a orders by ID
export const show = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const order = await orderstore.show(req.params.id as unknown as string);
		res.json({
			status: 'success',
			data: order,
			message: 'this is the SHOW route',
		});
	} catch (err) {
		next(err);
	}
};

// Get current order by user id
export const orderByUserId = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const order = await orderstore.OrderByUserId(
			req.params.userId as unknown as string
		);
		res.json({
			status: 'success',
			data: order,
			message: 'this is the orderByUserId route',
		});
	} catch (err) {
		next(err);
	}
};
// create New order
export const create = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { status, user_id } = req.body as Order;

	try {
		const newOrder = await orderstore.create({ status, user_id });
		res.json({
			status: 'success',
			data: newOrder,
			message: 'this is the CREATE route',
		});
	} catch (err) {
		next(err);
	}
};

// update order by ID
export const update = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// console.log(req.params.id);
	const data: Order = {
		id: req.params.id as unknown as string,
		status: req.body.status,
		user_id: req.body.user_id,
	};

	try {
		const order = await orderstore.update(data);
		res.json({
			status: 'success',
			data: order,
			message: 'product updated successfully',
		});
	} catch (err) {
		next(err);
	}
};

// Delete order by ID
export const destroy = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const deleted = await orderstore.delete(req.params.id as unknown as string);
		res.json({
			status: 'success',
			data: deleted,
			message: 'this is the DELETE route',
		});
	} catch (err) {
		next(err);
	}
};
// Add Product To Cart
export const addProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const quantity: number = parseInt(req.body.quantity as string) || 0;
	const orderId: string = req.params.orderId;
	const productId: string = req.body.product_id;

	try {
		const addedProduct = await orderstore.addProduct(
			quantity,
			orderId,
			productId
		);
		res.json({
			status: 'success',
			data: addedProduct,
			message: 'this is the CREATE route',
		});
	} catch (err) {
		next(err);
	}
};

// Get all completed orders by user id
export const completedOrdersByUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const completedOrder = await orderstore.CompletedOrdersbyuser(
			req.params.userId as unknown as string
		);
		res.json({
			status: 'success',
			data: completedOrder,
			message: 'this is the SHOW route',
		});
	} catch (err) {
		next(err);
	}
};
