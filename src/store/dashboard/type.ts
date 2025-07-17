import { type } from "os";

export type DataResponse = {
  result?: boolean;
  message?: string;
  data: {
    data: Data[];
    totalData: number;
  };
};

export type DataFilter = {
  filter: {
    tanggal: string;
  };
  sortBy: string | null;
  order: string | null;
  pageSize: number;
  pageNumber: number;
};

export type Data = {
  id: string;
  tanggal: string | null;
  jam: string | null;
  ruangan: string | null;
  detail: DashboardDetails[];
  peminjam: string | null;
  mjMengetahui: string | null;
  jemaatPeminjam: string | null;
};

export type DashboardDetails = {
  jenisKegiatan: string;
  durasi: string;
  jumlahOrang: number;
};

// export interface LocationState {
//     state: AppState;
// }
// interface AppState {
//     itemData: DataDashboard;
//     mode: string;
//     IsEdit: boolean;
// }
