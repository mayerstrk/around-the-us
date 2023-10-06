import process from 'node:process';
import { type Request, type RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorName } from '@shared/shared-enums/error-names';
import safe from '@shared/shared-helpers/safe';
import { isRequestUser } from '@shared/shared-helpers/is-request-user';

const validateTokenMiddleware: RequestHandler = async (
	request,
	_response,
	next,
) => {
	try {
		const token = await safe({
			value: request.signedCookies?.token as string | undefined,
			errorMessage: 'No token provided',
			errorName: ErrorName.authentication,
		});

		const decoded = await safe({
			value: jwt.verify(token, process.env.JWT_SECRET!),
			errorMessage: 'Invalid token format.',
			errorName: ErrorName.authentication,
			typeguard: isRequestUser,
		});

		(request as Request & { user: { _id: string } }).user = decoded;
		next();
	} catch (error) {
		next(error);
	}
};

export default validateTokenMiddleware;
