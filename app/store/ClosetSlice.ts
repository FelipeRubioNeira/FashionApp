import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategorizedClothingCollection } from '../domain/Types';

const initialState: CategorizedClothingCollection = {
    topClothing: [],
    bottomClothing: [],
    shoes: []
};

const closetSlice = createSlice({
    name: 'clothing',
    initialState,
    reducers: {
        initialiceItems: (state, action: PayloadAction<CategorizedClothingCollection>) => {
            state.topClothing = action.payload.topClothing
            state.bottomClothing = action.payload.bottomClothing
            state.shoes = action.payload.shoes
        },
    },
});

export const {
    initialiceItems,
} = closetSlice.actions;

export default closetSlice.reducer;