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
    userID: string;
    email: string | null;
    anggotaKomisi: string | null;
    password: string | null;
    phoneNo: string | null;
    fullName: string;
    address: string;
    alternatePhoneNo: string;
};

export type DataInsert = {
    userID: string;
    email: string | null;
    anggotaKomisi: string | null;
    password: string | null;
    phoneNo: string | null;
    fullName: string;
    address: string;
    alternatePhoneNo: string;
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