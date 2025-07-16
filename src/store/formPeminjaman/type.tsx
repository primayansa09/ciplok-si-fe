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
        id: string;
    };
    sortBy: string | null;
    order: string | null;
    pageSize: number;
    pageNumber: number;
};

export type Data = {
    id: string;
    tanggalPemakaian: string | null;
    tanggalPengajuan: string | null;
    jamMulaiPemakaian: string | null;
    jumlahOrang: string | null;
    mjMengetahui: string | null;
    jemaatPeminjam: string | null;
    deskripsi: string | null;
};

export type DataMJ = {
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
    transactionID: string;
    status: string | null;
    startTime: string | null;
    roomName: string | null;
    reservationDate: Date;
    createdDate: Date;
    createdBy: string | null;
    description: string | null;
    mjRequest: string | null;
    mjMengetahui: string | null;
    details: DetailData[];
};

export type DetailData = {
  criteriaCode: string;
  criteriaName: string;
  criteriaID:number;
  subCriteriaID:number;
  bobot:number;
  subCriteriaName:string;
  subCriteriaBobot:number;
  parameter:boolean;
};

export type ReservationData = {
    transactionID: number;
    reservationDate: Date;
    startTime: string;
    description: string;
    mjMengetahui: string;
    peminjaman: string | null;
    roomName: string | null;
    createdBy: string | null;
    deskripsi: string | null;

};

export type ScoreData = {
    transactionID: number;
    tanggalPengajuan:string;
    recommendationStatus:string;
    finalScore:string;

};

export type ValidateError = {
    codePenatua: boolean;
    namaPenatua: boolean;
}

export interface DataApproval {
    reservationDate: Date;
    startTime: string;
    roomName: string;
}



export interface LocationState {
    state: AppState;
}
interface AppState {
    itemData: DataInsert;
    mode: string;
    IsEdit: boolean;
}