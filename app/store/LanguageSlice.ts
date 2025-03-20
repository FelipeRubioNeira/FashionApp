import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "app/store/Store";



type LanguageState = {
    currentLanguage: string,

}


// ------------ initial state ------------ //
const initialState: LanguageState = {
    currentLanguage: "es",

}


// ------------ slice ------------ //
const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage(state, action: PayloadAction<string>) {
            state.currentLanguage = action.payload;
        },
    },
});

/**
 * 
 * @param state - recibe el estado actual
 * @returns retorna el estado completo del slice
 */
const LanguageState = (state: RootState) => state.language



// ------------ export ------------ //

export const {
    setLanguage,
} = languageSlice.actions;

export {
    LanguageState
}

export default languageSlice.reducer;