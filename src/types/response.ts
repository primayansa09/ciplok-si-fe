export interface ApiResponse<T> {
  statusCode: number;
  status: "success" | "error";
  message: string;
  data: T;
  pageNumber: number;
  pageSize: number;
  totalData: number;
  totalPages: number;
  sortBy?: string | null;
  order?: string | null;
}
