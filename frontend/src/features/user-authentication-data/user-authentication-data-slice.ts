import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type UserIdentifiers } from '../auth-api/auth-api';

type UserAuthenticationData = UserIdentifiers & { isAuthorized: boolean; isTokenPersisted: boolean };

const initialState: UserAuthenticationData = {
	data: {
		_id: '',
		email: '',
	},
	isAuthorized: false,
	isTokenPersisted: false,
};

const userAuthenticationData = createSlice({
	name: 'user',
	initialState,
	reducers: {
		userAuthorized(state, { payload }: PayloadAction<UserIdentifiers>) {
			return {
				...payload,
				isAuthorized: true,
				isTokenPersisted: state.isTokenPersisted,
			};
		},
		tokenPersisted(state) {
			return {
				...state,
				isTokenPersisted: true,
			};
		},
		userLoggedOut() {
			return initialState;
		},
	},
});

export const { userAuthorized, userLoggedOut, tokenPersisted } = userAuthenticationData.actions;
export default userAuthenticationData.reducer;

