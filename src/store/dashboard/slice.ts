import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiResponse } from '../../types/response';
import apiClient from '../../config/api-client';
import { Data } from './type';

interface DataDashboardState {
  data: Data[];
  loading: boolean;
  error: string | null;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalData: number;
}

const initialState: DataDashboardState = {
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
}

