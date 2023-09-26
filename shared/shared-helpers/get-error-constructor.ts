import { ErrorName } from '../shared-enums/error-names';
import {
	ValidationError,
	NotFoundError,
	CastError,
	DuplicateKeyError,
	AuthenticationError,
	AuthorizationError,
	type AppCustomErrorConstructor,
} from '../shared-classes/shared-custom-errors';

function getErrorConstructor(errorName: ErrorName): AppCustomErrorConstructor {
	switch (errorName) {
		case ErrorName.validation: {
			return ValidationError;
		}

		case ErrorName.notFound: {
			return NotFoundError;
		}

		case ErrorName.cast: {
			return CastError;
		}

		case ErrorName.duplicateKey: {
			return DuplicateKeyError;
		}

		case ErrorName.authentication: {
			return AuthenticationError;
		}

		case ErrorName.authorization: {
			return AuthorizationError;
		}

		default: {
			throw new Error('Unknown error name provided');
		}
	}
}

export default getErrorConstructor;
