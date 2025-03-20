import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "app/store/Store";
import { EditOutfitInformation, Outfit } from 'FashonApp/src/domain/Types';

// ------------- types ------------ //
interface OutfitsState {
    outfits: Outfit[],
    currentOutfit: EditOutfitInformation | null,
}


// ------------ initial state ------------ //
const initialState: OutfitsState = {
    outfits: [],
    currentOutfit: null,
}


// ------------ slice ------------ //
const OutfitsSlice = createSlice({
    name: 'outfits',
    initialState,
    reducers: {

        // ----------- actions for outfisList ----------- //

        initializeOutfits: (state, action: PayloadAction<Outfit[]>) => {
            state.outfits = action.payload;
        },

        /**
         *  Actualiza un outfit individual en el estado
         */
        updateOutfit: (state, action: PayloadAction<Outfit>) => {
            const index = state.outfits.findIndex(outfit => outfit.id === action.payload.id);
            if (index !== -1) {
                state.outfits[index] = action.payload;
            }
        },

        // ----------- actions for currentOutfit ----------- //
        setCurrentOutfit: (state, action: PayloadAction<EditOutfitInformation>) => {
            state.currentOutfit = action.payload;
        },

        addOutfit: (state, action: PayloadAction<Outfit>) => {
            state.outfits.push(action.payload);
        }

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
    updateOutfit,
    setCurrentOutfit,
    addOutfit,
    
} = OutfitsSlice.actions;

export {
    OutfitState
}

export default OutfitsSlice.reducer;