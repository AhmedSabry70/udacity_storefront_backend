import { Response, Request, NextFunction } from 'express';
import ProductStore from '../models/Product';
import Product from '../types/productType';

const store = new ProductStore();
// Get all products in database
export const index = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const products = await store.index();
		res.json({
			status: 'success',
			data: products,
			message: 'this is the INDEX route',
		});
	} catch (err) {
		next(err);
	}
};

// Get a product by ID
export const show = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const product = await store.show(req.params.id as unknown as string);
		res.json({
			status: 'success',
			data: product,
			message: 'this is the SHOW route',
		});
	} catch (err) {
		next(err);
	}
};

// create New products
export const create = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const product: Product = {
		name: req.body.name,
		price: req.body.price,
		category: req.body.category,
	};

	try {
		const newProduct = await store.create(product);
		res.json({
			status: 'success',
			data: newProduct,
			message: 'this is the CREATE route',
		});
	} catch (err) {
		next(err);
	}
};

// update products by ID
export const update = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// console.log(req.params.id);
	const data: Product = {
		id: req.params.id as unknown as string,
		name: req.body.name,
		price: req.body.price,
		category: req.body.category,
	};

	try {
		const product = await store.update(data);
		res.json({
			status: 'success',
			data: product,
			message: 'product updated successfully',
		});
	} catch (err) {
		next(err);
	}
};

// Delete products by ID
export const destroy = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const deleted = await store.delete(req.params.id as unknown as string);
		res.json({
			status: 'success',
			data: deleted,
			message: 'this is the DELETE route',
		});
	} catch (err) {
		next(err);
	}
};

// Get products by category
export const category = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const showCate = await store.category(
			req.params.category as unknown as string
		);
		res.json({
			status: 'success',
			data: showCate,
			message: 'this is the category route',
		});
	} catch (err) {
		next(err);
	}
};
