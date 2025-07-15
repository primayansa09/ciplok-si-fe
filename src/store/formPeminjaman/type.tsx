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
    peminjaman: string | null;
    jenisKegiatan: string | null;
    ruangan: string | null;
    durasi: string | null;
    tanggalPemakaian: string | null;
    tanggalPengajuan: string | null;
    jamMulaiPemakaian: string | null;
    jumlahOrang: string | null;
    mjMengetahui: string | null;
    jemaatPeminjam: string | null;
    deskripsi: string | null;
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