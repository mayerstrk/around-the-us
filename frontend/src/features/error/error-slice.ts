import { createSlice, isRejectedWithValue, type Middleware, type MiddlewareAPI, type PayloadAction, type AnyAction } from '@reduxjs/toolkit';
import { type AppDispatch, type RootState } from '../../components/App/store';
import { toggledErrorPopupVisibility } from '../popups/popups-visibility-slice';

interface ErrorAction {
	[key: string]: any;
	error: {
		[key: string]: any;
		message: string;
	};
	payload: {
		[key: string]: any;
		data: {
			[key: string]: any;
			_message: string;
			errors: Record<string, unknown>;
			message: string;
			name: string;
		};
		message: string;
		status: string;
	};
}

const errorHandler: Middleware = (api: MiddlewareAPI<AppDispatch, RootState>) => (next: AppDispatch) => (action: AnyAction) => {
	if (isRejectedWithValue(action)) {
		api.dispatch(setError(action as ErrorAction));
		if (!api.getState().popupsVisibility.errorPopupIsVisible) {
			api.dispatch(toggledErrorPopupVisibility());
		}
	}

	return next(action);
};

const initialState = {} as ErrorAction;

const errorSlice = createSlice({
	name: 'error',
	initialState,
	reducers: {
		setError(state, action: PayloadAction<ErrorAction>) {
			state.error = action.payload.error;
			state.payload = action.payload.payload;
		},
	},
});

export const { setError } = errorSlice.actions;
export default errorSlice.reducer;
export { errorHandler };
