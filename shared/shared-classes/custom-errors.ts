import { Status } from '../shared-enums/status';
import { ErrorName } from '../shared-enums/error-names';

abstract class CustomError extends Error {
	status: Status;
	name: ErrorName;
	cause?: Error;

	constructor(message: string, status: Status, name: ErrorName, cause?: Error) {
		super(message);
		this.status = status;
		this.name = name;
		Error.captureStackTrace(this, this.constructor);
		if (cause) {
			this.cause = cause;
		}
	}
}

class ValidationError extends CustomError {
	constructor(message: string, originalError?: Error) {
		super(
			message || 'The input is not valid.',
			Status.badRequest,
			ErrorName.validation,
			originalError,
		);
	}
}

class NotFoundError extends CustomError {
	constructor(message: string, originalError?: Error) {
		super(
			message || 'The requested resource was not found.',
			Status.notFound,
			ErrorName.notFound,
			originalError,
		);
	}
}

class CastError extends CustomError {
	constructor(message: string, originalError?: Error) {
		super(
			message || 'Type casting error. ',
			Status.badRequest,
			ErrorName.cast,
			originalError,
		);
	}
}

class DuplicateKeyError extends CustomError {
	constructor(message: string, originalError?: Error) {
		super(
			message || 'A resource with that identifier already exists.',
			Status.badRequest,
			ErrorName.duplicateKey,
			originalError,
		);
	}
}

class AuthenticationError extends CustomError {
	constructor(message: string, originalError?: Error) {
		super(
			message || 'Authentication failed.',
			Status.unauthorized,
			ErrorName.authentication,
			originalError,
		);
	}
}

class AuthorizationError extends CustomError {
	constructor(message: string, originalError?: Error) {
		super(
			message || 'You are not authorized to perform this action.',
			Status.forbidden,
			ErrorName.authorization,
			originalError,
		);
	}
}

class InternalServerError extends CustomError {
	constructor(message: string, originalError?: Error) {
		super(
			message || 'An unexpected server error occurred.',
			Status.internalServerError,
			ErrorName.internalServerError,
			originalError,
		);
	}
}

type AppCustomErrorConstructor =
	| typeof ValidationError
	| typeof NotFoundError
	| typeof CastError
	| typeof DuplicateKeyError
	| typeof AuthenticationError
	| typeof AuthorizationError
	| typeof InternalServerError;

export type { AppCustomErrorConstructor };

export {
	CustomError,
	ValidationError,
	NotFoundError,
	CastError,
	DuplicateKeyError,
	AuthenticationError,
	AuthorizationError,
	InternalServerError,
};
