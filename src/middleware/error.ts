import { Response, Request, NextFunction } from 'express';
import Error from '../types/errorType';

//  export default Error

const errorMiddleware = (
	error: Error,
	req: Request,
	res: Response,
	_next: NextFunction
) => {
	const status = error.status || 500;
	const message = error.message || 'Whoops!! something went wrong';
	res.status(status).json({ status, message });
};

export default errorMiddleware;
