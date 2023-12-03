import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type ExpectedRejectedActionPayload } from './error-middleware';

const initialState = {
	globalErrorMessage: '',
	message: '',
	clicked: false,
};

const errorSlice = createSlice({
	name: 'error',
	initialState,
	reducers: {
		setErrorMessage(state, { payload }: PayloadAction<string>) {
			state.message = payload;
		},
		setGlobalErrorPopupMessageFromError(
			state,
			action: PayloadAction<ExpectedRejectedActionPayload>,
		) {
			state.message = `Error ${action.payload.status} - (${action.payload.data.message}`;
		},
	},
});

export const { setErrorMessage, setGlobalErrorPopupMessageFromError } =
	errorSlice.actions;
export default errorSlice.reducer;
