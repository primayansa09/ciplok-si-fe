import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import dataMajelisReducer from './dataMajelis/slice';

// Import reducer lain di sini kalau ada

export const store = configureStore({
    reducer: {
        auth: authReducer,
        dataMajelis: dataMajelisReducer,
        // Tambahkan reducer lain di sini
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
