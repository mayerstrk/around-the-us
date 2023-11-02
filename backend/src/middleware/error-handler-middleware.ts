import process from 'node:process';
import { type Request, type Response } from 'express';
import {
	CustomError,
	InternalServerError,
} from '@shared/shared-classes/custom-errors'; // Update the path accordingly
import { ErrorName } from '@shared/shared-enums/error-names';
import { type NextFunction } from 'express-serve-static-core';

const errorHandlerMiddleware = (
	error: Error,
	_request: Request,
	response: Response,
	// Thank you so much! I could not for the life of me understand why I was getting html as a response
	_next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
	console.error(error.stack);
	// Check if the error is an instance of CustomError
	if (error instanceof CustomError) {
		return response
			.setHeader('Content-Type', 'application/json')
			.status(error.status)
			.send({
				message: error.message,
				name: error.name,
				cause: { message: error.cause?.message, error: error.cause },
			});
	}

	// If it's not one of the known errors, it's an internal server error
	// This should be caught by the safe funcion's getErrorConstructor helper
	// but this is a fallback in case an error is thrown outside of the safe
	// function(which shouldn't happen) or it doesn't catch it for some reason

	const internalError = new InternalServerError(
		error.message || 'Unexpected error',
	);

	return response.status(internalError.status).send({
		message:
			process.env.NODE_ENV === 'development'
				? 'unhandled error - ' + internalError.message
				: internalError.message,
		name: ErrorName.internalServerError,
	});
};

export default errorHandlerMiddleware;
