import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
// Import reducer lain di sini kalau ada

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Tambahkan reducer lain di sini
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
