import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type CardData } from '../app-data-api/app-data-api-slice';

const initialState = {} as CardData;

const selectedCardSlice = createSlice({
	name: 'select-card',
	initialState,
	reducers: {
		selectedCard(state, { payload }: PayloadAction<CardData>) {
			return payload;
		},
	},
});

export default selectedCardSlice.reducer;
export const { selectedCard } = selectedCardSlice.actions;
