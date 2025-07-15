const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://localhost:7152/api";

export const ApiJemaat = {
  getData: `${BASE_URL}/maintainUser/getAllDataJemaat`,
  createData: `${BASE_URL}/maintainUser/addNewUser`,
  updateData: `${BASE_URL}/maintainUser/updateDataMajelis`,
};
