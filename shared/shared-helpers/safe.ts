import {
	CastError,
	ValidationError,
} from '../shared-classes/shared-custom-errors';
import { type ErrorName } from '../shared-enums/error-names';
import { type CustomError } from '../shared-types/helper-types/custom-error-helper-type';
import getErrorConstructor from './get-error-constructor';

type NeitherOption = {
	test?: never;
	typeguard?: never;
};

type SafeConfig<V, R extends V = V> = {
	value: V | Promise<V>;
	async?: boolean;
	errorMessage: string;
	errorName: ErrorName;
} & (
	| { typeguard: (value: V) => value is R; test?: never }
	| { test: (value: V) => boolean; typeguard?: never }
	| NeitherOption
);

/**
 * Safely handles and resolves the provided value, which can be either a regular value or a promise.
 * This function aids in validation, type checking, and error handling.
 *
 * @remarks
 * - The `test` and `typeguard` options are mutually exclusive. Only one of them should be provided at a time.
 *   If both are provided, the behavior is undefined.
 *
 * @template V - The type of the value or promise.
 * @template R - The type the value is expected to be (if using a typeguard). Defaults to V.
 *
 * @param {SafeOptions<V, R>} options - Configuration object for the function.
 * @param {V | Promise<V>} options.value - The value or promise to be resolved and validated.
 * @param {boolean} [options.async=false] - Indicates whether the provided value is a promise that should be awaited.
 * @param {string} options.errorMessage - The custom error message to be used when throwing an error.
 * @param {ErrorName} options.errorName - The name of the error to be thrown.
 * @param {(value: V) => boolean} [options.test] - An optional test function to validate the value.
 * @param {(value: V) => value is R} [options.typeguard] - An optional type guard function to validate the type of the value.
 *
 * @returns {Promise<NonNullable<R>> | Promise<NonNullable<V>>} - The resolved and validated value.
 * If the value passes the test or typeguard, it is returned.
 * If neither test nor typeguard is provided, the original value is returned as long as it's not null or undefined.
 * If the value is null or undefined, or if it fails the test or typeguard, a custom error is thrown.
 *
 * @throws {CustomError} - Throws a custom error based on the provided errorName if:
 * - The promise rejects (when `async` is true).
 * - The value is null or undefined.
 * - The value fails the test or typeguard.
 *
 *
 * @example
 * const data = await safe({
 *     value: Promise.resolve(42),
 *     async: true,
 *     errorMessage: 'Value not found',
 *     errorName: ErrorName.notFound,
 *     test: value => value > 40
 * });
 * // data = 42
 */
async function safe<V, R extends V>(
	options: SafeConfig<V, R> & { typeguard: (value: V) => value is R },
): Promise<NonNullable<R>>;

async function safe<V>(configuration: SafeConfig<V>): Promise<NonNullable<V>>;

async function safe<V, R extends V>(configuration: SafeConfig<V, R>) {
	const {
		value,
		async = false,
		errorMessage,
		errorName,
		test,
		typeguard,
	} = configuration;

	let resolvedValue;

	if (async) {
		try {
			resolvedValue = await value;
		} catch (error) {
			const ErrorConstructor = getErrorConstructor(errorName);
			throw new ErrorConstructor(errorMessage, error as Error);
		}
	} else {
		resolvedValue = value as NonNullable<V>;
	}

	if (resolvedValue === null || resolvedValue === undefined) {
		throw new CastError('Value is null or undefined');
	}

	if (test) {
		if (test(resolvedValue)) {
			return resolvedValue;
		}

		throw new ValidationError(
			`Validation failed for value: ${String(resolvedValue)}`,
		);
	}

	if (typeguard) {
		if (typeguard(resolvedValue)) {
			return resolvedValue;
		}

		throw new CastError(
			`Type guard failed for value: ${String(resolvedValue)}`,
		);
	}

	return resolvedValue;
}

export default safe;
