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
        codePenatua: string;
    };
    sortBy: string | null;
    order: string | null;
    pageSize: number;
    pageNumber: number;
};

export type Data = {
    id: string;
    codePenatua: string | null;
    namaPenatua: string | null;
    jabatanPenatua: string | null;
    alamatPenatua: string | null;
    noWhatsapp: string | null;
    awalPeriode: Date;
    akhirPeriode: Date;
};

export type DataInsert = {
    id: string;
    codePenatua: string | null;
    namaPenatua: string | null;
    jabatanPenatua: string | null;
    alamatPenatua: string | null;
    noWhatsapp: string | null;
    awalPeriode: Date;
    akhirPeriode: Date;
};

export type ValidateError = {
    codePenatua: boolean;
    namaPenatua: boolean;
}


export interface DataMajelis {
  codePenatua: string;
  namaPenatua: string;
  jabatanPenatua: string;
  phoneNumber: string;
  startDate: string;
  endDate: string;
}


export interface LocationState {
    state: AppState;
}
interface AppState {
    itemData: DataInsert;
    mode: string;
    IsEdit: boolean;
}