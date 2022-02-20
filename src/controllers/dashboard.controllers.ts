import { Request, Response, NextFunction } from 'express';
import DashboardQueries from '../services/dashboard';
const dashboard = new DashboardQueries();
// get all user have orders
export const usersWithOrders = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const users = await dashboard.usersWithOrders();
		res.json({
			status: 'success',
			data: users,
			message: 'this is the CREATE route',
		});
	} catch (err) {
		next(err);
	}
};

// get every product inside a ordes
export const productsInOrders = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const products = await dashboard.productsInOrders();
		res.json({
			status: 'success',
			data: products,
			message: 'this is the CREATE route',
		});
	} catch (err) {
		next(err);
	}
};

// sort and show the most five expensive products // sort by
export const fiveMostExpensive = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const products = await dashboard.fiveMostExpensive();
		res.json({
			status: 'success',
			data: products,
			message: 'this is the CREATE route',
		});
	} catch (err) {
		next(err);
	}
};
