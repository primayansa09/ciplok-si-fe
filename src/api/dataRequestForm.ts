import apiClient from "../config/api-client";
import { ApiCriteria } from "../constants/apiCriteria";
import { DataMajelisAPI } from "../constants/apiDataMajelis";
import { RequestFormAPI } from "../constants/apiRequestForm";
import { Criteria, CriteriaData, Data, DataInsert, DataMJ } from "../store/formPeminjaman/type";
import { ApiResponse } from "../types/response";

export const fetchRequestData = async (page: number, pageSize: number): Promise<ApiResponse<Data[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Data[]>>(`${RequestFormAPI.getData}?${page + 1}&pageSize=${pageSize}`);
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

export const createFormRequest = (formData: DataInsert): Promise<ApiResponse<Boolean>> => {
  return apiClient
    .post(`${RequestFormAPI.create}`, formData)
    .then((response) => {
      const responseData = response.data;
      return responseData;
    })
    .catch((error) => {
      console.error("Error creating data:", error);
      throw error;
    });
};

export const updateFromRequest = (transactionID: number, formData: DataInsert): Promise<ApiResponse<Boolean>> => {
  console.log("Edit Majelis form data:", formData);
  return apiClient
    .post(`${RequestFormAPI.updateData}/${transactionID}`, formData)
    .then((response) => {
      const responseData = response.data;
      return responseData;
    })
    .catch((error) => {
      console.error("Error updating data:", error);
      throw error;
    });
};


export const fetchDataMajelis = async (pageNumber: number, pageSize: number, source: string): Promise<ApiResponse<DataMJ[]>> => {
  try {
    const queryParams = new URLSearchParams({
      page: String(pageNumber + 1),
      pageSize: String(pageSize),
    });
    if (source) {
      queryParams.append("dropdown", source);
    }
    console.log(queryParams)
    const apiUrl = `${DataMajelisAPI.getData}?${queryParams.toString()}`;

    const response = await apiClient.post<ApiResponse<DataMJ[]>>(apiUrl);
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

export const fetchDataCriteriaRequest = async () => {
  try {
    const response = await apiClient.post<Criteria[]>(
      `${ApiCriteria.getDataCritList}`
    );
    console.log(response.data)
    if (response.data.length > 0) {
      return response.data;
    } else {
      console.error(`Error: ${response.data}`);
      return [];
    }
  } catch (error) {
    console.error("Error fetching anggotaKomisi:", error);
    return [];
  }
};