import { configureStore } from '@reduxjs/toolkit';
import closetReducer from './ClosetSlice';
import outfitsReducer from './OutfitsSlice';

export const store = configureStore({
  reducer: {
    closet: closetReducer,
    outfits: outfitsReducer,
    // Puedes agregar más reducers aquí si es necesario
  },
});



// Inferir el tipo `RootState` y `AppDispatch` desde el store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

