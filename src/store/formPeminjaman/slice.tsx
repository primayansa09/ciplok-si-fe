import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataApproval, DataResponse } from "./type";
import { ApprovalAPI } from "../../constants/apiApproval";
import apiClient from "../../config/api-client";
import { ApiResponse } from "../../types/response";
// import { createSlice } from "@reduxjs/toolkit";


interface DataMajelisState {
    data: DataApproval[];
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
}

export const fetchDataApproval = createAsyncThunk('dataApproval/fetch',
    async (params: FetchParams, thunkAPI) => {
        try {
            const { pageNumber, pageSize, searchTerm } = params;
            const query = new URLSearchParams({
                pageNumber: pageNumber.toString(),
                pageSize: pageSize.toString(),
                ...(searchTerm ? { search: searchTerm } : {})
            }).toString()
            const url = `${ApprovalAPI.getData}?${query}`;
            const response = await apiClient.get<ApiResponse<DataApproval[]>>(url);
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
)
const approvalSlice = createSlice({
    name: 'dataReservation',
    initialState,
    reducers: {},
     extraReducers: (builder) => {
        builder
            .addCase(fetchDataApproval.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDataApproval.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.pageNumber = action.payload.pageNumber;
                state.pageSize = action.payload.pageSize;
                state.totalPages = action.payload.totalPages;
                state.totalData = action.payload.totalData;
            })
            .addCase(fetchDataApproval.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default approvalSlice.reducer;
