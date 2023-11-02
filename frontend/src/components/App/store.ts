import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from '../../features/current-user/current-user-slice';
import popupsVisibilityReducer from '../../features/popups/popups-visibility-slice';
import selectedCardReducer from '../../features/selected-card/selected-card-slice';
import errorReducer from '../../features/error/error-slice';
import { appDataApiSlice } from '../../features/app-data-api/app-data-api-slice';
import errorHandler from '../../features/error/error-middleware';

export const store = configureStore({
	reducer: {
		// Configure store does for us what combine reducer would do if we pass an object
		currentUser: currentUserReducer,
		popupsVisibility: popupsVisibilityReducer,
		selectedCard: selectedCardReducer,
		error: errorReducer,
		[appDataApiSlice.reducerPath]: appDataApiSlice.reducer,
	},
	middleware(getDefaultMiddleware) {
		return getDefaultMiddleware().concat(
			appDataApiSlice.middleware,
			errorHandler,
		);
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
