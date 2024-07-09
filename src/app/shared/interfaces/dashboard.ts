export interface oneManage {
    id: string
    nameAr: string
    nameEn: string
}

export interface employeeDetails {
    employeeId: string
    employeeNameAr: string
    employeeNameEn: any
    blood: any
    employeePersonId: any
    employeePersonExpireDate: any
    mobile: any
    mobileEmergency: any
    branchId: string
    branchNameAr: string
    branchNameEn: any
    manageId: string
    manageNameAr: string
    manageNameEn: string
    jobId: string
    jobNameAr: any
    jobNameEn: any
}

export interface empFullDetails {
    employeeId: string
    employeeNameAr: string
    employeeNameEn: string
    blood: string
    employeePersonId: string
    employeePersonExpireDate: string
    mobile: string
    mobileEmergency: string
    companyId: string
    companyNameAr: string
    companyNameEn: string
    branchId: string
    branchNameAr: string
    branchNameEn: string
    manageId: string
    manageNameAr: string
    manageNameEn: string
    nationId: string
    nationNameAr: string
    nationNameEn: string
    departmentId: string
    departmentNameAr: string
    departmentNameEn: string
    jobId: string
    jobNameAr: string
    jobNameEn: string
    kafilId: string
    kafilNameAr: string
    kafilNameEn: string
}


export interface branch {
    employeesCount: number
    id: string
    nameAr: string
    nameEn: any
}

