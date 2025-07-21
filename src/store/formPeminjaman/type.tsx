
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
    transactionID: number;
    status: string | null;
    roomName: string | null;
    reservationDate: string | null;
    reservationDateString: string | null;
    description: string;
    mjRequest: string;
    createdBy: string;
    createdDate: string;
    startTime: string;
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
    transactionID: number;
    status: string | null;
    startTime: string | null;
    roomName: string | null;
    reservationDate: Date | null;
    createdDate: Date;
    createdBy: string | null;
    description: string | null;
    mjRequest: string | null;
    mjMengetahui: string | null;
    subCriteriaList: DetailData[];
};

export type DetailData = {
    idTrDetail: number;
    criteriaID: number;
    subCriteriaID: string;
    subCriteriaName: string;
    subCriteriaBobot: number;
    selectedSubCriteriaID?: number;
};

export const initialCriteriaDetails: CriteriaData[] = [
    {
        idCriteria: 0,
        criteriaCode: "",
        criteriaName: "",
        bobot: 0,
        parameter: "",
        subCriteriaID: "",
        subCriteriaName: "",
        subCriteriaBobot: 0

    },
];

export type CriteriaData = {
    idCriteria: number;
    criteriaCode: string;
    criteriaName: string;
    bobot: number;
    parameter: string;
    subCriteriaID: string;
    subCriteriaName: string;
    subCriteriaBobot: number;
}

export type ReservationData = {
    [key: string]: string | number | null;
    transactionID: number;
    reservationDate: string;
    startTime: string;
    description: string;
    mjMengetahui: string;
    peminjaman: string | null;
    roomName: string | null;
    createdBy: string | null;
    status: string;

};

export type ScoreData = {
    transactionID: number;
    tanggalPengajuan: string;
    recommendationStatus: string;
    finalScore: string;

};


export type SubCriteria = {
    idTrDetail: number;
    idSubCriteria: number;
    idCriteria: number;
    subCriteriaName: string;
    subCriteriaBobot: number;
};

export type Criteria = {
    idHeaderCriteria: number;
    criteriaName: string;
    bobot: number;
    parameter: string;
    criteriaCode: string;
    subCriteriaList: SubCriteria[];
};

export interface DataApproval {
    reservationDate: Date;
    startTime: string;
    roomName: string;
}

export interface FinalizeApproval {
    transactionID: number;
    reservationDate: Date;
    startTime: string;
    roomName: string;
    status: string;
}


export interface LocationState {
    state: AppState;
}
interface AppState {
    itemData: DataInsert;
    mode: string;
    IsEdit: boolean;
}