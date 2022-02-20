import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserStore from '../models/User';
import authschema from '../middleware/uservalid';
import User from '../types/userType';
import config from '../config';
import { passErr } from '../types/errorType';

const userStore = new UserStore();

// register New User
export const register = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const role = req.headers.role as string;
	if (role != 'admin') {
		try {
			const headerAuth = req.get('Authorization');

			//ceck if there jwt token or not
			if (headerAuth) {
				// bearer
				const bearer = headerAuth.split(' ')[0].toLowerCase();
				///extracte bearer token
				const token = headerAuth.split(' ')[1];
				//ceck if jwt token valid or not with my bearer token secret key
				if (token && bearer === 'bearer') {
					const decode = jwt.verify(token, config.tokenSC as unknown as string);
					if (decode) next(); // valid token so go ahead
				}
			} else {
				return passErr('login Error: Please try again', 403, next);
			}
		} catch (err) {
			return passErr('login Error: Please try again', 401, next);
		}
	}
	try {
		const registerValid = await authschema.regschema.validateAsync(req.body);
		if (registerValid) {
			//console.log(registerValid);

			const user = await userStore.create(req.body);
			res.json({
				status: 'success',
				data: user,
				message: 'User created successfully',
			});
		}
	} catch (error) {
		next(error);
	}
};

export const indexUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const users = await userStore.index();
		res.json({
			status: 'success',
			data: users,
			message: 'User retrieved successfully',
		});
	} catch (err) {
		next(err);
	}
};

// Get a User by ID
export const show = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await userStore.show(req.params.id as unknown as string);
		res.json({
			status: 'success',
			data: user,
			message: 'User retrieved successfully',
		});
	} catch (err) {
		return next(err);
	}
};

// update User by ID
export const updateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const data: User = {
			id: req.params.id as unknown as string,
			email: req.body.email,
			user_name: req.body.user_name,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			password: req.body.password,
		};
		const upDateValid = await authschema.upDateschema.validateAsync(req.body);
		if (upDateValid) {
			const user = await userStore.update(data);
			res.json({
				status: 'success',
				data: user,
				message: 'User updated successfully',
			});
		}
	} catch (err) {
		next(err);
	}
};

// Delete User by ID
export const deletUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await userStore.delete(req.params.id as unknown as string);
		res.json({
			status: 'success',
			data: user,
			message: 'User deleted successfully',
		});
	} catch (err) {
		next(err);
	}
};

// Login Authenticate By USERNAME & Password
export const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const loginInputValid = await authschema.loginschema.validateAsync(
			req.body
		);
		if (loginInputValid) {
			const { email, password } = req.body;
			const user = await userStore.authenticate(email, password);
			if (user) {
				const accessToken = jwt.sign(
					{ user },
					config.tokenSC as unknown as string
				);
				return res.json({
					status: 'success',
					data: { ...user, accessToken },
					message: 'user authenticated successfully',
				});
			} else {
				return res.status(401).json({
					status: 'error',
					message: 'the username and password do not match please try again',
				});
			}
		}
	} catch (err) {
		return next(err);
	}
};
