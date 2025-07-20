import apiClient from '../config/api-client';
import { ApprovalAPI } from '../constants/apiApproval';
import { DataInsert, ReservationData } from '../store/formPeminjaman/type';
import { ApiResponse } from '../types/response';


export const fetchApprovalByDate = (uniqueCombination: string): Promise<ApiResponse<any>> => {
  return apiClient
    .post(`${ApprovalAPI.getDataApprovalByDate}/${uniqueCombination}`)
    .then((response) => {
      const responseData = response.data;
      return responseData;
    })
    .catch((error) => {
      console.error("Error fetching approval data:", error);
      throw error;
    });
};



export const finalizeApprovalData = (
  id: number,
  formData: any
): Promise<ApiResponse<boolean>> => {
  return apiClient
    .post(`${ApprovalAPI.finalizeApproval}/${id}`, formData)
    .then((response) => {
      return response.data as ApiResponse<boolean>;
    })
    .catch((error) => {
      const apiError = error.response?.data;
      const err = new Error(apiError?.message || "Something went wrong");
      (err as any).statusCode = apiError?.statusCode || 500;

      throw err;
    });
};


export const fetchDataApproval = async (
  page: number,
  pageSize: number,
  searchData: string
): Promise<ApiResponse<ReservationData[]>> => {
  try {
    const queryParams = new URLSearchParams({
      page: String(page + 1),
      pageSize: String(pageSize),
    });
    if (searchData) {
      queryParams.append("date", searchData);
    }
    const apiUrl = `${ApprovalAPI.getListApproval}?${queryParams.toString()}`; console.log("API URL:", apiUrl);

    const response = await apiClient.get<ApiResponse<ReservationData[]>>(apiUrl);

    if (response.data.statusCode === 200) {
      return response.data;
    } else {
      console.error("Error fetching data:", response.data.message);
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
    console.error("Error in fetchDataApproval:", error); // Log the error
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

