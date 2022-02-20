import { NextFunction } from 'express';
export type Error = {
	status?: number;
	name?: string;
	message?: string;
	stack?: string;
};

export const passErr = (
	message: string,
	status: number,
	next: NextFunction
) => {
	const err: Error = new Error(message);
	err.status = status;
	next(err);
};

export default Error;
