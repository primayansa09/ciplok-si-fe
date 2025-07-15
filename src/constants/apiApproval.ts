const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://localhost:7152/api";

export const ApprovalAPI = {
  getData: `${BASE_URL}/approval/getDataReservation`, // ✅ disesuaikan ke endpoint baru
  getDataApprovalByDate: `${BASE_URL}/approval/getDataApprovalByDate`,
  deleteData: `${BASE_URL}/Majelis/delete`,
};
