import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type UserData } from '../app-data-api/app-data-api-slice';

const initialState: UserData = {} as UserData;

const currentUserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		userFetched(state, { payload }: PayloadAction<UserData>) {
			return payload;
		},
	},
});

export const { userFetched } = currentUserSlice.actions;
export default currentUserSlice.reducer;

