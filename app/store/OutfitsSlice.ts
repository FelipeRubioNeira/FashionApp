import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "@/store/Store";
import { Outfit } from '@/domain/Types';

// ------------- types ------------ //
interface OutfitsState {
    outfits: Outfit[];
}


// ------------ initial state ------------ //
const initialState: OutfitsState = {
    outfits: []
}


// ------------ slice ------------ //
const OutfitsSlice = createSlice({
    name: 'outfits',
    initialState,
    reducers: {
        initializeOutfits: (state, action: PayloadAction<Outfit[]>) => {
            state.outfits = action.payload 
        },
    },
});

/**
 * 
 * @param state - recibe el estado actual
 * @returns retorna el estado completo del slice
 */
const OutfitState = (state: RootState) => state.outfits



// ------------ export ------------ //

export const {
    initializeOutfits,
} = OutfitsSlice.actions;

export {
    OutfitState
}

export default OutfitsSlice.reducer;