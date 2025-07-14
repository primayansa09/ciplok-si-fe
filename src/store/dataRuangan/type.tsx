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
    namaKegiatan: string | null;
    deskripsiKegiatan: string | null;
    scoreKegiatan: string | null;
};

export type DataInsert = {
    id: string;
    namaRuangan: string | null;
    kapasitas: string | null;
    jamAwalPemakaian: string | null;
    jamAkhirPemakaian: string | null;
    scoreKegiatan: string | null;
};

export type ValidateError = {
    codePenatua: boolean;
    namaPenatua: boolean;
}

export interface LocationState {
    state: AppState;
}
interface AppState {
    itemData: DataInsert;
    mode: string;
    IsEdit: boolean;
}