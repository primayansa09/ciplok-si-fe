import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Menggunakan localStorage
import authReducer from './auth/authSlice';
import dataMajelisReducer from './dataMajelis/slice';
import fetchDataApproval from './formPeminjaman/slice';

const persistConfig = {
  key: 'root',
  storage, // Pilih localStorage atau sessionStorage
  whitelist: ['auth'], // Simpan hanya auth (jika ada data lain yang ingin disimpan, tambahkan di sini)
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    dataMajelis: dataMajelisReducer,
    dataReservation: fetchDataApproval,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store); // Pastikan persistor di-export

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
