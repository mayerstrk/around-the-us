import {
	type AnyAction,
	type Middleware,
	type MiddlewareAPI,
	isRejectedWithValue,
} from '@reduxjs/toolkit';
import { type UnknownAsyncThunkRejectedAction } from '@reduxjs/toolkit/dist/matchers';
import { type AppDispatch, type RootState } from '../../components/App/store';
import { toggledErrorPopupVisibility } from '../popups/popups-visibility-slice';
import { appDataApiSlice } from '../app-data-api/app-data-api-slice';
import { setErrorMessageFromError } from './error-slice';

interface ExpectedActionMetaArg {
	endpointName: string;
}

interface ExpectedActionPayload {
	status: string;
	originalStatus: number;
	data: {
		message: string;
		name: string;
		cause?: unknown;
	};
	error: string;
}

const ignoredEndpoints = new Set(['logIn', 'createUser', 'validateToken']);

const errorHandler: Middleware =
	(api: MiddlewareAPI<AppDispatch, RootState>) =>
	(next: AppDispatch) =>
	(action: AnyAction) => {
		if (isRejectedWithValue(action)) {
			appDataApiSlice.endpoints.validateToken.initiate();

			if (
				action.meta.arg &&
				ignoredEndpoints.has(
					(action.meta.arg as ExpectedActionMetaArg).endpointName,
				)
			) {
				return next(action);
			}

			api.dispatch(
				setErrorMessageFromError(
					action as UnknownAsyncThunkRejectedAction & {
						payload: ExpectedActionPayload;
					},
				),
			);

			if (!api.getState().popupsVisibility.errorPopupIsVisible) {
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
export type { ExpectedActionMetaArg, ExpectedActionPayload };
