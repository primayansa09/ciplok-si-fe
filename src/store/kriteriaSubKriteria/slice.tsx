import { DataResponse } from "./type";
// import { createSlice } from "@reduxjs/toolkit";

export const initialState: DataResponse = {
    result: undefined,
    message: undefined,
    data: {
        data: [],
        totalData: 0,
    },
};

// export const roleTypeSlice = createSlice({
//     name: "dataKriteriaTypeSlice",
//     initialState,
//     reducers:{
//         getFormKriteriaType:(state,action) => ({
//             ...state,
//             data: {
//                 ...state.data,
//                 data:action.payload.data,
//                 totalData:action.payload.totalData,
//             }
//         })
//     }
// });

// export const { getFormKriteriaType } = roleTypeSlice.actions;

// export const roleTypeReducer = roleTypeSlice.reducer;