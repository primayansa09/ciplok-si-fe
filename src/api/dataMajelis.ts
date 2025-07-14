import apiClient from "../config/api-client";
import { DataMajelisAPI } from "../constants/apiDataMajelis";
import axios from 'axios';
import { DataFilter, DataResponse } from "../store/dataMajelis/type";


export const getDataMajelis = (filter: DataFilter): Promise<DataResponse> => {
    console.log("req", filter);
    return apiClient
    .post<DataResponse, any>(`${DataMajelisAPI.getData}`, filter)
    .then((response) => {
        const responseData = response.data;
        return responseData;
    });
};