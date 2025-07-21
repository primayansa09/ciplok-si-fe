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
    userID: string;
    majelisID: string;
    codePnt: string | null;
    fullName: string | null;
    jabatanPenatua: string | null;
    alamatPenatua: string | null;
    phoneNo: string | null;
    startDate: Date | null;
    endDate: Date | null;
};

export type ValidateError = {
    codePenatua: boolean;
    namaPenatua: boolean;
}


export interface DataMajelis {
    userID:string;
    majelisID:string;
    codePnt: string;
    fullName: string;
    jabatanPenatua: string;
    phoneNo: string;
    alamatPenatua: string;
    startDate: Date;
    endDate: Date;
}


export interface DataUserMajelis {
    fullName: string;
    address: string;
    phoneNo: string;
    userID: string;
}


export interface LocationState {
    state: AppState;
}
interface AppState {
    itemData: DataInsert;
    mode: string;
    IsEdit: boolean;
}