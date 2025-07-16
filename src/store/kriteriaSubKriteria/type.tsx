import { type } from "os";

export type DataResponse = {
  result?: boolean;
  message?: string;
  data: {
    data: Data[]; // Update this line to match the structure of your API response
    totalData: number;
  };
};

export type DataFilter = {
  filter: {
    kodeKriteria: string;
  };
  sortBy: string | null;
  order: string | null;
  pageSize: number;
  pageNumber: number;
};

export type Data = {
  id: string;
  kodeKriteria: string | null;
  namaKriteria: string | null;
  bobotKriteria: string | null;
  nilai: string | null;
  kriteriaDetails: KriteriaDetails[];
};

export type DataInsert = {
  id: string;
  kodeKriteria: string | null;
  namaKriteria: string | null;
  bobotKriteria: string | null;
  nilai: string | null;
  kriteriaDetails: KriteriaDetails[];
};

export const initialKriteriaDetails: KriteriaDetails[] = [
  {
    namaSubKriteria: "",
    bobot: "",
  },
];

export type KriteriaDetails = {
  namaSubKriteria: string;
  bobot: string;
};

export type ValidateError = {
  kodeKriteria: boolean;
  namaKriteria: boolean;
  bobotKriteria: boolean;
  nilai: boolean;
};

export interface LocationState {
  state: AppState;
}
interface AppState {
  itemData: DataInsert;
  mode: string;
  IsEdit: boolean;
}
