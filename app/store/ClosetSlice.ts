import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategorizedClothingCollection, Clothing, ClothingType } from '../domain/Types';
import { RootState } from "app/store/Store";


// ---------- store ---------- //
interface ClosetState {

    // visible list for user
    topClothing: Array<Clothing>,
    bottomClothing: Array<Clothing>,
    shoes: Array<Clothing>,

    // backup to restore the original list
    originalTopClothing: Array<Clothing>,
    originalBottomClothing: Array<Clothing>,
    originalShoes: Array<Clothing>,

    // index that allows to show the selected clothing
    topVisibleClothingId: number,
    bottomVisibleClothingId: number,
    shoesVisibleClothingId: number,

    // block the movement of the clothing list
    topClothingBlocked: boolean,
    bottomClothingBlocked: boolean,
    shoesBlocked: boolean,
}

const initialState: ClosetState = {
    topClothing: [],
    bottomClothing: [],
    shoes: [],

    // backup
    originalTopClothing: [],
    originalBottomClothing: [],
    originalShoes: [],


    topVisibleClothingId: -1,
    bottomVisibleClothingId: -1,
    shoesVisibleClothingId: -1,

    topClothingBlocked: false,
    bottomClothingBlocked: false,
    shoesBlocked: false,
};


// Función auxiliar para filtrar ropas por texto de búsqueda
const filterClothingBySearchText = (
    originalList: Clothing[],
    searchText: string
): Clothing[] => {
    const lowerText = searchText.toLowerCase();
    return originalList.filter(clothing => clothing.name.toLowerCase().includes(lowerText));
};

// Función auxiliar para mover al inicio el item cuyo id sea visible
const reorderClothingList = (list: Clothing[], visibleId: number): Clothing[] => {

    const index = list.findIndex(item => item.id === visibleId);

    if (index > 0) {
        const savedItem = list[index];
        const restOfList = list.filter((_item, i) => i !== index);

        return [savedItem, ...restOfList];
    }
    return list;
};




const closetSlice = createSlice({
    name: 'clothing',
    initialState,
    reducers: {

        initialiceItems: (state, action: PayloadAction<CategorizedClothingCollection>) => {

            state.topClothing = action.payload.topClothing
            state.bottomClothing = action.payload.bottomClothing
            state.shoes = action.payload.shoes

            // backup 
            state.originalTopClothing = action.payload.topClothing
            state.originalBottomClothing = action.payload.bottomClothing
            state.originalShoes = action.payload.shoes
        },

        deteleClothing: (state, action: PayloadAction<{ clothingId: number, clothingType: ClothingType }>) => {
            const { clothingId, clothingType } = action.payload;


            switch (clothingType) {
                case "top":
                    state.topClothing = state.topClothing.filter(clothing => clothing.id != clothingId);
                    break;
                case "bottom":
                    state.bottomClothing = state.bottomClothing.filter(clothing => clothing.id != clothingId);
                    break;
                case "shoes":
                    state.shoes = state.shoes.filter(clothing => clothing.id != clothingId);
                    break;
            }
        },

        updateVisibleClothig: (state, action: PayloadAction<{ clothingType: ClothingType, clothingId: number }>) => {

            const clothingType = action.payload.clothingType;
            const clothingId = action.payload.clothingId;

            const {
                topClothingBlocked,
                bottomClothingBlocked,
                shoesBlocked,

                topClothing,
                bottomClothing,
                shoes,
            } = state

            switch (clothingType) {

                case "top":
                    if(topClothingBlocked || state.topClothing.length == 0) return;
                    state.topVisibleClothingId = clothingId;
                    break;

                case "bottom":
                    if(bottomClothingBlocked || bottomClothing.length == 0) return;
                    state.bottomVisibleClothingId = clothingId;
                    break;

                case "shoes":
                    if(shoesBlocked || shoes.length == 0) return;
                    state.shoesVisibleClothingId = clothingId;
                    break;

            }

        },

        onSearchClothing: (state, action: PayloadAction<string>) => {

            const searchText = action.payload.trim();
            if (searchText === "") return;

            if (!state.topClothingBlocked) {
                state.topClothing = filterClothingBySearchText(state.originalTopClothing, searchText);
                if (state.topClothing.length > 0) state.topVisibleClothingId = state.topClothing[0].id;
            }

            if (!state.bottomClothingBlocked) {
                state.bottomClothing = filterClothingBySearchText(state.originalBottomClothing, searchText);
                if (state.bottomClothing.length > 0) state.bottomVisibleClothingId = state.bottomClothing[0].id;
            }

            if (!state.shoesBlocked) {
                state.shoes = filterClothingBySearchText(state.originalShoes, searchText);
                if (state.shoes.length > 0) state.shoesVisibleClothingId = state.shoes[0].id;
            }

        },

        resetSearchClothing: (state) => {

            state.topClothing = state.originalTopClothing.slice();
            state.bottomClothing = state.originalBottomClothing.slice();
            state.shoes = state.originalShoes.slice();

            // Reordenar para que el ítem guardado en visible pase a ser el primero
            state.topClothing = reorderClothingList(state.topClothing, state.topVisibleClothingId);
            state.bottomClothing = reorderClothingList(state.bottomClothing, state.bottomVisibleClothingId);
            state.shoes = reorderClothingList(state.shoes, state.shoesVisibleClothingId);

        },

        lockClothingSearch: (state, action: PayloadAction<{ clothingType: ClothingType }>) => {

            const clothingType = action.payload.clothingType;

            switch (clothingType) {
                case "top":
                    state.topClothingBlocked = !state.topClothingBlocked;
                    break;
                case "bottom":
                    state.bottomClothingBlocked = !state.bottomClothingBlocked;
                    break;
                case "shoes":
                    state.shoesBlocked = !state.shoesBlocked;
                    break;
            }

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
    deteleClothing,
    onSearchClothing,
    resetSearchClothing,
    updateVisibleClothig,
    lockClothingSearch
} = closetSlice.actions;

export {
    closetState
}

export default closetSlice.reducer;