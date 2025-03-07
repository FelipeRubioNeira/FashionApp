import { configureStore } from '@reduxjs/toolkit';
import closetSlice from './ClosetSlice';
import outfitsSlice from './OutfitsSlice';

export const store = configureStore({
  reducer: {
    closet: closetSlice,
    outfits: outfitsSlice,
    // Puedes agregar más reducers aquí si es necesario
  },
});



// Inferir el tipo `RootState` y `AppDispatch` desde el store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

