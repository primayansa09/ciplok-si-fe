const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://localhost:7152/api";

export const DataSettingsAPI = {
  getDataJabatan: `${BASE_URL}/maintainUser/jabatanList`,

};
