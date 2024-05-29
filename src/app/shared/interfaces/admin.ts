
export interface adminLetter {
    id: number;
    destinationName: string;
    isRequiredCCC: boolean;
    details: string;
    letterType: string;
    uploadFileId: string;
    employeeId: string;
    employeeName: string;
}

export interface adminAsset {
    id: number
    details: string
    isEmployeeAgree: boolean
    uploadFileId: any
    employeeId: string
    employeeName: string
}


export interface adminPermission {
    id: number
    startDate: string
    endDate: string
    details: string
    uploadFileId: any
    employeeId: string
    employeeName: string
}

