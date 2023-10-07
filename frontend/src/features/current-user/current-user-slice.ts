import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type AppResponsePayloadDictionary } from '@shared/shared-types/requests/app-response-payload-dictionaries.types';
import { type AppQueryEndpointName } from '@shared/shared-enums/endpoint-names';

const initialState =
	{} as AppResponsePayloadDictionary[AppQueryEndpointName.getUser];

const currentUserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		userFetched(_state, { payload }: PayloadAction<typeof initialState>) {
			return payload;
		},
		userLoggedOut() {
			return initialState;
		},
	},
});

export const { userFetched, userLoggedOut } = currentUserSlice.actions;
export default currentUserSlice.reducer;
