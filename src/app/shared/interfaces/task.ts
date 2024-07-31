export interface TaskDetails {
        id: number
        kind: string
        direction: string
        duration: number
        fromDate: string
        toDate: string
        details: any
        cost: any
        travelTicket: any
        visas: string
        uploadFileId: any
        employeeId: string
        employeeNameAr: string
        employeeNameEn: string
        manageId: string
        manageNameAr: string
        manageNameEn: string
        departmentId: string
        departmentNameAr: string
        departmentNameEn: string
        jobId: string
        jobNameAr: string
        jobNameEn: string
        createDate: any
}

export interface empOrderTaskInterface {
        id: number
        kind: string
        direction: string
        duration: number
        fromDate: string
        toDate: string
        details: any
        cost: any
        travelTicket: any
        visas: any
        createDate: string
        approveStatus: string
        approveDetails: any
        uploadFileId: any
}


export interface personalDataTask {
        empId: string
        nameAr: string
        nameEn: string
        manageId: string
        manageNameAr: string
        manageNameEn: string
        departmentId: string
        departmentNameAr: string
        departmentNameEn: string
        jobId: string
        jobNameAr: string
        jobNameEn: string
}
