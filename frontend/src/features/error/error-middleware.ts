import {
	type AnyAction,
	type Middleware,
	type MiddlewareAPI,
	isRejectedWithValue,
} from '@reduxjs/toolkit';
import { type UnknownAsyncThunkRejectedAction } from '@reduxjs/toolkit/dist/matchers';
import * as yup from 'yup';
import { type AppDispatch, type RootState } from '../../components/App/store';
import { toggledErrorPopupVisibility } from '../popups/popups-visibility-slice';
import { appDataApiSlice } from '../app-data-api/app-data-api-slice';
import {
	setErrorMessage,
	setGlobalErrorPopupMessageFromError,
} from './error-slice';

interface ExpectedRejectedActionMetaArgument {
	endpointName: string;
}

interface ExpectedRejectedActionPayload {
	status: string;
	originalStatus: number;
	data: {
		message: string;
		name: string;
		cause?: unknown;
	};
	error: string;
}

type ExpectedRejectedAction = UnknownAsyncThunkRejectedAction & {
	payload: ExpectedRejectedActionPayload;
	meta: { arg: ExpectedRejectedActionMetaArgument };
};

const ExpectedRejectedActionSchema = yup.object().shape({
	payload: yup
		.object()
		.shape({
			data: yup
				.object()
				.shape({
					message: yup.string().required(),
					name: yup.string().notRequired(),
					cause: yup.mixed().notRequired(),
				})
				.required(),
		})
		.required(),
	meta: yup
		.object()
		.shape({
			arg: yup
				.object()
				.shape({
					endpointName: yup.string().required(),
				})
				.required(),
		})
		.required(),
});

function validateRejectedAction(
	action: unknown,
): action is ExpectedRejectedAction {
	try {
		ExpectedRejectedActionSchema.validateSync(action);
		return true;
	} catch (error) {
		if (error instanceof yup.ValidationError) {
			console.error(
				`Error action not of the expected shape (${
					error.message
				}): ${JSON.stringify(error, undefined, 2)}`,
			);
		} else {
			console.error(
				`Error action not of the expected shape: ${JSON.stringify(
					error,
					undefined,
					2,
				)}`,
			);
		}

		return false;
	}
}

const authEndpoints = new Set([
	'signIn',
	'createUser',
	'validateToken',
	'logOut',
]);

const errorHandler: Middleware =
	(api: MiddlewareAPI<AppDispatch, RootState>) =>
	(next: AppDispatch) =>
	(action: AnyAction) => {
		if (isRejectedWithValue(action)) {
			if (!validateRejectedAction(action)) {
				throw new Error('Action does not match the expected shape');
			}

			if (!authEndpoints.has(action.meta.arg.endpointName)) {
				appDataApiSlice.endpoints.validateToken.initiate();
			}

			api.dispatch(setErrorMessage(action.payload.data.message));
			api.dispatch(setGlobalErrorPopupMessageFromError(action.payload));

			if (
				!api.getState().popupsVisibility.errorPopupIsVisible &&
				!authEndpoints.has(action.meta.arg.endpointName)
			) {
				api.dispatch(toggledErrorPopupVisibility());
				setTimeout(() => {
					if (api.getState().popupsVisibility.wasClicked) {
						return;
					}

					api.dispatch(toggledErrorPopupVisibility());
				}, 6000);
			}
		}

		return next(action);
	};

export default errorHandler;
export type {
	ExpectedRejectedActionMetaArgument as ExpectedRejectedActionMetaArg,
	ExpectedRejectedActionPayload,
	ExpectedRejectedAction,
};
