const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://localhost:7152/api";

export const DataSettingsAPI = {
  getDataSettings: `${BASE_URL}/maintainUser/settingsAPI`,

};
