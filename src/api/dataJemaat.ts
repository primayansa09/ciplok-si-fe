import { DataMajelisAPI } from '../constants/apiDataMajelis';
import { ApiResponse } from '../types/response';
import { DataUserMajelis } from '../store/dataMajelis/type';
import apiClient from '../config/api-client';
import { Data, DataInsert } from '../store/dataJemaat/type';
import { ApiJemaat } from '../constants/apiJemaat';

export const fetchNamaPenatua = async (query: string) => {
  try {
    const response = await apiClient.get<ApiResponse<DataUserMajelis[]>>(DataMajelisAPI.getDataMajelis, {
      params: { query },
    });

    if (response.data.statusCode === 200) {
      return response.data.data;
    } else {
      console.error(`Error: ${response.data.message}`);
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const fetchDataJemaat = async (): Promise<ApiResponse<Data[]>> => {
  try {
    const response = await apiClient.post<ApiResponse<Data[]>>(ApiJemaat.getData);
    if (response.data.statusCode === 200) {
      return response.data; 
    } else {
      console.error(`Error: ${response.data.message}`);
      return {
        status: "error",
        statusCode: response.data.statusCode,
        message: response.data.message || "Something went wrong",
        data: [],
        pageNumber: 1,
        pageSize: 10,
        totalData: 0,
        totalPages: 1,
      };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      status: "error",
      statusCode: 500,
      message: "An error occurred while fetching data",
      data: [],
      pageNumber: 1,
      pageSize: 10,
      totalData: 0,
      totalPages: 1,
    };
  }
};

export const createDataJemaat = (formData: DataInsert): Promise<ApiResponse<Boolean>> => {
  console.log("Submitting form data:", formData);
  return apiClient
    .post(`${ApiJemaat.createData}`, formData)
    .then((response) => {
      const responseData = response.data;
      return responseData;
    })
    .catch((error) => {
      console.error("Error creating data:", error);
      throw error;
    });
};


export const updateDataJemaat = (userID: number, formData: DataInsert): Promise<ApiResponse<Boolean>> => {
  console.log("Edit Jemaat form data:", formData);
  return apiClient
    .post(`${ApiJemaat.updateData}/${userID}`, formData)
    .then((response) => {
      const responseData = response.data;
      return responseData;
    })
    .catch((error) => {
      console.error("Error updating data:", error);
      throw error;
    });
};
