import apiClient from "../config/api-client";
import { ApiCriteria } from "../constants/apiCriteria";
import { Data, DataInsert } from "../store/kriteriaSubKriteria/type";
import { ApiResponse } from "../types/response";

export const fetchDataCriteria = async (page: number, pageSize: number): Promise<ApiResponse<Data[]>> => {
  try {
    const response = await apiClient.post<ApiResponse<Data[]>>(`${ApiCriteria.getData}?${page + 1}&pageSize=${pageSize}`);
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

export const createDataCriteria = (formData: DataInsert): Promise<ApiResponse<Boolean>> => {
  console.log("Submitting Criteria data:", formData);
  return apiClient
    .post(`${ApiCriteria.createData}`, formData)
    .then((response) => {
      const responseData = response.data;
      return responseData;
    })
    .catch((error) => {
      console.error("Error creating data:", error);
      throw error;
    });
};

export const editDataCriteria = (id: number, formData: DataInsert): Promise<ApiResponse<Boolean>> => {
  console.log("Edit Criteria form data:", formData);
  return apiClient
    .post(`${ApiCriteria.updateData}/${id}`, formData)
    .then((response) => {
      const responseData = response.data;
      return responseData;
    })
    .catch((error) => {
      console.error("Error updating data:", error);
      throw error;
    });
};
