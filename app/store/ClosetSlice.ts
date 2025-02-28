import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategorizedClothingCollection } from '../domain/Types';
import { RootState } from "@/store/Store";



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

/**
 * 
 * @param state - recibe el estado actual
 * @returns retorna el estado completo del slice
 */
const closetState = (state: RootState) => state.closet



// ------------ export ------------ //

export const {
    initialiceItems,
} = closetSlice.actions;

export {
    closetState
}

export default closetSlice.reducer;