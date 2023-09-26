import { type Request, type Response } from 'express';
import { ErrorName } from '@shared/shared-enums/error-names';
import {
	type AppMutationEndpointName,
	type AppQueryEndpointName,
} from '../../enums/endpoint-names';
import { Status } from '../../../../shared/shared-enums/status';
import { type AppRequest } from '../../types/app-request-types';
import {
	type MutationHelperOptions,
	type QueryHelperOptions,
} from '../../types/controller-helper-types';

interface AppError extends Error {
	code?: number;
	name: ErrorName;
}

const handleError = (error: AppError, response: Response) => {
	switch (error.name) {
		case ErrorName.validation: {
			response.status(Status.badRequest);
			break;
		}

		case ErrorName.notFound: {
			response.status(Status.notFound);
			break;
		}

		case ErrorName.cast: {
			response.status(Status.badRequest);
			break;
		}

		case ErrorName.authentication: {
			response.status(Status.unauthorized);
			break;
		}

		case ErrorName.authorization: {
			response.status(Status.forbidden);
			break;
		}

		case ErrorName.duplicateKey: {
			if (error.code !== 11_000) {
				break;
			}

			response.status(Status.badRequest);
			break;
		}

		default: {
			response.status(Status.internalServerError);
			break;
		}
	}

	response.send({
		message: error.message ?? 'Unexpected error',
		name: error.name,
	});
};

/**
 * The `controllerBuilder` provides a streamlined way to build Express.js
 * controllers. Its core objective is to abstract repetitive behaviors, such as
 * error handling and response formatting, so we can focus on the specific
 * logic of each endpoint.
 *
 *
 * 1. **Method Invocation**:
 *    Depending on the type of request they're
 *    handling, either `controllerBuilder.query()` or`controllerBuilder.mutation()`
 * 		is called. These methods are passed an options object that includes the
 * 		actual logic for the controller: the `controllerHelper`.
 *
 * 2. **Controller Function Creation**:
 *    Both `query` and `mutation` methods of the `controllerBuilder` return an
 *    async function. This function represents the Express.js controller for the
 *    respective endpoint. The returned function accepts standard `request` and
 *    `response` parameters.
 *
 * 3. **Controller Helper Execution**:
 *    Inside the generated controller function, the provided `controllerHelper` is
 *    called. This helper function contains the core logic for handling the
 *    specific endpoint. It's executed with the `request` and `response` objects.
 *    Here, the request object is cast to the `AppRequest<N>` type to ensure it's
 *    of the expected shape and structure. This type casting is achieved through
 *    TypeScript generics, allowing for a flexible yet strongly-typed request
 *    object that can differ depending on the endpoint.
 *
 * 4. **Controller Return**:
 *    Once the `controllerBuilder` has encapsulated the `controllerHelper` logic
 *    within the standard behaviors (like error handling), it returns this
 *    composite function. This function, now acting as the controller for the
 *    specific endpoint, is ready to be integrated into the Express.js route
 *    definitions.
 *
 * By this point, the controllers are prepared and can be imported and attached
 * to routes. The `controllerBuilder` is a powerful tool that allows us to
 * streamline the creation of Express.js controllers, while also ensuring that
 * they're consistent and follow the same structure.
 * @module
 * @category Builders
 * @subcategory Controller
 * @see {@link https://expressjs.com/en/guide/routing.html#express-router Express.js Router}
 */
const controllerBuilder = {
	query<N extends AppQueryEndpointName>({
		controllerHelper,
	}: QueryHelperOptions<N>) {
		return async (request: Request, response: Response) => {
			try {
				let data;
				({ request, response, data } = await controllerHelper(
					request as AppRequest<N>,
					response,
				));

				response.status(Status.ok).send({ data });
			} catch (error) {
				handleError(error as AppError, response);
			}
		};
	},
	mutation<N extends AppMutationEndpointName>({
		controllerHelper,
	}: MutationHelperOptions<N>) {
		return async (request: Request, response: Response) => {
			try {
				let data;
				({ request, response, data } = await controllerHelper(
					request as AppRequest<N>,
					response,
				));

				response.status(Status.ok).send({ data });
			} catch (error) {
				handleError(error as AppError, response);
			}
		};
	},
};

export default controllerBuilder;
