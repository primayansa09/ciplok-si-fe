import apiClient from "../config/api-client";
import { DataMajelisAPI } from "../constants/apiDataMajelis";
import { DataFilter, DataInsert, DataMajelis, DataResponse } from "../store/dataMajelis/type";


export const getDataMajelis = (filter: DataFilter): Promise<DataResponse> => {
    console.log("req", filter);
    return apiClient
    .post<DataResponse, any>(`${DataMajelisAPI.getData}`, filter)
    .then((response) => {
        const responseData = response.data;
        return responseData;
    });
};



export const createDataMajelis = (formData: DataInsert): Promise<any> => {
  console.log("Submitting form data:", formData);
  return apiClient
    .post(`${DataMajelisAPI.createData}`, formData)
    .then((response) => {
      const responseData = response.data;
      return responseData;
    })
    .catch((error) => {
      console.error("Error creating data:", error);
      throw error;
    });
};