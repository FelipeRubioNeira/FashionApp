import { configureStore } from '@reduxjs/toolkit';
import closetReducer from './ClosetSlice';

export const store = configureStore({
  reducer: {
    closet: closetReducer,
    // Puedes agregar más reducers aquí si es necesario
  },
});



// Inferir el tipo `RootState` y `AppDispatch` desde el store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

