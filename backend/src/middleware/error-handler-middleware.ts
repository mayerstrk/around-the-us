import process from 'node:process';
import { type Request, type Response } from 'express';
import {
	CustomError,
	InternalServerError,
} from '@shared/shared-classes/custom-errors'; // Update the path accordingly
import { ErrorName } from '@shared/shared-enums/error-names';

const errorHandlerMiddleware = (
	error: Error,
	_request: Request,
	response: Response,
) => {
	// Check if the error is an instance of your CustomError
	if (error instanceof CustomError) {
		console.log('custom error');
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
