const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://localhost:7152/api";

export const RequestFormAPI = {
  getData: `${BASE_URL}/transaction/getDataReservation`, // ✅ disesuaikan ke endpoint baru

};
