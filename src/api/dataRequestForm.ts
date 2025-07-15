import apiClient from "../config/api-client";
import { RequestFormAPI } from "../constants/apiRequestForm";
import { Data } from "../store/formPeminjaman/type";
import { ApiResponse } from "../types/response";

export const fetchRequestData = async (): Promise<ApiResponse<Data[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Data[]>>(RequestFormAPI.getData);
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