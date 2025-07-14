import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';

interface AuthState {
  token: string | null;
  fullName: string;
  roleName: string;
  jabatanPenatua: string;
  anggotaKomisi: string;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  fullName: '',
  roleName: '',
  jabatanPenatua: '',
  anggotaKomisi: '',
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN, credentials);
      sessionStorage.setItem('token', response.data.token);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Login failed'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.fullName = '';
      state.roleName = '';
      sessionStorage.removeItem('token');
      sessionStorage.clear();
      // localStorage.removeItem('role');
      localStorage.clear()
    },
    setTokenFromSession(state) {
      const token = sessionStorage.getItem('token');
      const role = localStorage.getItem('role');
      const fullName = localStorage.getItem('fullName');
      const anggotaKomisi = localStorage.getItem('anggotaKomisi');
      const jabatanPenatua = localStorage.getItem('jabatanPenatua');
      if (token) {
        state.token = token;
      }
      if (role) {
        state.roleName = role;
        state.fullName = fullName || "";
        state.jabatanPenatua = jabatanPenatua || "";
        state.anggotaKomisi = anggotaKomisi || "";
      }

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: any) => {
        state.loading = false;
        state.token = action.payload.token;
        state.fullName = action.payload.fullName;
        state.roleName = action.payload.roleName;
        sessionStorage.setItem('token', action.payload.token);
        localStorage.setItem('role', action.payload.roleName);
        localStorage.setItem('fullName', action.payload.fullName);
        localStorage.setItem('jabatanPenatua', action.payload.jabatanPenatua);
        localStorage.setItem('anggotaKomisi', action.payload.anggotaKomisi);
      })
      .addCase(login.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { logout, setTokenFromSession } = authSlice.actions;
export default authSlice.reducer;
