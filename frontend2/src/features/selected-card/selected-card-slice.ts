import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type CardData } from '@shared/shared-types/resources/card.types';

const initialState = {} as CardData;

const selectedCardSlice = createSlice({
	name: 'select-card',
	initialState,
	reducers: {
		selectedCard(_state, { payload }: PayloadAction<CardData>) {
			return payload;
		},
	},
});

export default selectedCardSlice.reducer;
export const { selectedCard } = selectedCardSlice.actions;
