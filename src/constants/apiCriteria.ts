const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://localhost:7152/api";

export const ApiCriteria = {
  getData: `${BASE_URL}/MasterCriteria/criteriaList`,
  createData: `${BASE_URL}/MasterCriteria/addCriteria`,
  updateData: `${BASE_URL}/MasterCriteria/editCriteria`,
};
