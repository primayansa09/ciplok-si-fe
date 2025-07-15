const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://localhost:7152/api";

export const DataMajelisAPI = {
  getData: `${BASE_URL}/maintainUser/getDataMajelis`,
  getDataMajelis: `${BASE_URL}/maintainUser/getAllDataUser`,
  createData: `${BASE_URL}/maintainUser/addNewMajelis`,
  updateData: `${BASE_URL}/maintainUser/updateDataMajelis`,
};
