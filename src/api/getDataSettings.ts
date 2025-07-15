import { ApiResponse } from '../types/response';
import { DataSettingsAPI } from '../constants/apiSettings';
import apiClient from '../config/api-client'; 
import { DataSettings } from '../store/dataSettings/type';



export const fetchJabatanPenatua = async (codeDesc: string) => {
  try {
    const response = await apiClient.get<ApiResponse<DataSettings[]>>(
      `${DataSettingsAPI.getDataSettings}/${codeDesc}`
    );

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

export const fetchAnggotaKomisi = async (codeDesc: string) => {
  try {
    const response = await apiClient.get<ApiResponse<DataSettings[]>>(
      `${DataSettingsAPI.getDataSettings}/${codeDesc}`
    );

    if (response.data.statusCode === 200) {
      return response.data.data;
    } else {
      console.error(`Error: ${response.data.message}`);
      return [];
    }
  } catch (error) {
    console.error("Error fetching anggotaKomisi:", error);
    return [];
  }
};