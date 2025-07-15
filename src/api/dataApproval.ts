import apiClient from '../config/api-client';
import { ApprovalAPI } from '../constants/apiApproval';
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