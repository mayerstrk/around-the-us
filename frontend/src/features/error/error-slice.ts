import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type UnknownAsyncThunkRejectedAction } from '@reduxjs/toolkit/dist/matchers';
import { type ExpectedActionPayload } from './error-middleware';

const initialState = {
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
		setErrorMessageFromError(
			state,
			action: PayloadAction<
				UnknownAsyncThunkRejectedAction & { payload: ExpectedActionPayload }
			>,
		) {
			state.message = `Error ${action.payload.payload.status} - (${
				action.payload.error.message
			}) ${action.payload.payload.data?.name ?? ''} - ${
				action.payload.payload.data?.message ?? action.payload.payload.error
			}`;
		},
	},
});

export const { setErrorMessage, setErrorMessageFromError } = errorSlice.actions;
export default errorSlice.reducer;
