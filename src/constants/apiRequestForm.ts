const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://localhost:7152/api";

export const RequestFormAPI = {
  getData: `${BASE_URL}/transaction/getDataReservation`, 
  create: `${BASE_URL}/transaction/formPengajuan`,
  updateData: `${BASE_URL}/transaction/updateFormPengajuan`
};
