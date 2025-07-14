// src/api/dataMajelisApi.ts
import { ApiResponse } from '../types/response';
import { DataSettingsAPI } from '../constants/apiSettings';
import apiClient from '../config/api-client';  // Import the apiClient you created
import { DataSettings } from '../store/dataSettings/type';

export const fetchJabatanPenatua = async () => {
  try {
 const response = await apiClient.get<ApiResponse<DataSettings[]>>(DataSettingsAPI.getDataJabatan);

    if (response.data.statusCode === 200) {
      return response.data.data;
    } else {
      console.error(`Error: ${response.data.message}`);
      return [];
    }
  } catch (error) {
    console.error("Error fetching jabatanPenatua:", error);
    return [];
  }
};
