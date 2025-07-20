import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiResponse } from '../../types/response';
import { DataMajelisAPI } from '../../constants/apiDataMajelis';
import apiClient from '../../config/api-client';
import { DataMajelis } from './type';

interface DataMajelisState {
  data: DataMajelis[];
  loading: boolean;
  error: string | null;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalData: number;
}

const initialState: DataMajelisState = {
  data: [],
  loading: false,
  error: null,
  pageNumber: 1,
  pageSize: 10,
  totalPages: 0,
  totalData: 0,
};

interface FetchParams {
  pageNumber: number;
  pageSize: number;
  searchTerm: string;
  source:string;
}

export const fetchDataMajelis = createAsyncThunk(
  'dataMajelis/fetch',
  async (params: FetchParams, thunkAPI) => {
    try {
      const { pageNumber, pageSize,source, searchTerm } = params;
      const query = new URLSearchParams({
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        source:"",
        ...(searchTerm ? { search: searchTerm } : {}),
      }).toString();
      const url = `${DataMajelisAPI.getData}?${query}`;
      const response = await apiClient.post<ApiResponse<DataMajelis[]>>(url);
      return {
        data: response.data.data,
        pageNumber: response.data.pageNumber,
        pageSize: response.data.pageSize,
        totalPages: response.data.totalPages,
        totalData: response.data.totalData,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const dataMajelisSlice = createSlice({
  name: 'dataMajelis',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataMajelis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataMajelis.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
        state.totalPages = action.payload.totalPages;
        state.totalData = action.payload.totalData;
      })
      .addCase(fetchDataMajelis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.data = []; // <- inisialisasi data kosong saat error seperti BadRequest
        state.totalData = 0;
      });
  },
});

export default dataMajelisSlice.reducer;
