import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategorizedClothingCollection, ClothingType } from '../domain/Types';
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
        deteleClothing: (state, action: PayloadAction<{ clothingId: number, clothingType: ClothingType }>) => {
            const { clothingId, clothingType } = action.payload;


            switch (clothingType) {
                case "Superior":
                    state.topClothing = state.topClothing.filter(clothing => clothing.id != clothingId);
                    break;
                case "Inferior":
                    state.bottomClothing = state.bottomClothing.filter(clothing => clothing.id != clothingId);
                    break;
                case "Zapatos":
                    state.shoes = state.shoes.filter(clothing => clothing.id != clothingId);
                    break;
            }
        }
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
    deteleClothing
} = closetSlice.actions;

export {
    closetState
}

export default closetSlice.reducer;