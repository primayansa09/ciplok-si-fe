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
  idHeaderCriteria: number | null;
  criteriaCode: string | null;
  criteriaName: string | null;
  bobot: string | null;
  parameter: string;
  subCriteriaList: CriteriaDetails[];
};

export type DataInsert = {
  idHeaderCriteria: number | null;
  criteriaCode: string | null;
  criteriaName: string | null;
  bobot: string | null;
  parameter: string;
  subCriteriaList: CriteriaDetails[];
};

export const initialCriteriaDetails: CriteriaDetails[] = [
  {
    idSubCriteria: null,
    idCriteria: null,
    subCriteriaBobot: null,
    subCriteriaName: "",

  },
];

export type CriteriaDetails = {
  idSubCriteria: number | null;
  idCriteria: number | null;
  subCriteriaName: string;
  subCriteriaBobot: number | null;
};

export type ValidateError = {
  criteriaName: boolean;
  bobot: boolean;
  parameter: boolean;
};

export interface LocationState {
  state: AppState;
}
interface AppState {
  itemData: DataInsert;
  mode: string;
  IsEdit: boolean;
}
