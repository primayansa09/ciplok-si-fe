import { DataMajelisAPI } from '../constants/apiDataMajelis';
import { ApiResponse } from '../types/response';
import { DataUserMajelis } from '../store/dataMajelis/type';
import apiClient from '../config/api-client';

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
