import { Response, Request, NextFunction } from 'express';
import config from '../config';
import jwt from 'jsonwebtoken';
import { passErr } from '../types/errorType';

const isAuthenticate = (req: Request, res: Response, next: NextFunction) => {
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
			passErr('login Error: Please try again', 403, next);
		}
	} catch (err) {
		passErr('login Error: Please try again', 401, next);
	}
};

export default isAuthenticate;
