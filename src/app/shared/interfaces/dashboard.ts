export interface oneManage {
    id: string
    nameAr: string
    nameEn: string
}

export interface employeeDetails {
    employeeId: string
    employeeNameAr: string
    employeeNameEn: string
    blood: any
    employeePersonId: any
    employeePersonExpireDate: any
    mobile: any
    mobileEmergency: any
    companyId: string
    companyNameAr: any
    companyNameEn: any
    branchId: string
    branchNameAr: string
    branchNameEn: any
    manageId: string
    manageNameAr: any
    manageNameEn: any
    nationId: string
    nationNameAr: any
    nationNameEn: any
    departmentId: any
    departmentNameAr: any
    departmentNameEn: any
    jobId: string
    jobNameAr: any
    jobNameEn: any
    kafilId: string
    kafilNameAr: any
    kafilNameEn: any
    state: number
    birthDate: any
    birthPlace: any
    age: any
    motherName: any
    gender: number
    marrige: number
    healthId: any
    healthDate: any
    healthExpired: any
    healthPlace: any
    passportId: any
    passportDate: any
    passportPlace: any
    passportExpired: any
    insuranceId: any
    insuranceRecordNo: any
    insuranceValue: number
    insurancePer: number
    insuranceCompany: any
    insuranceSalary: any
    insuranceDangGP: any
    insuranceDate: any
    insuranceDateE: any
}

export interface empFullDetails {
    employeeId: string
    employeeNameAr: string
    employeeNameEn: string
    blood: any
    employeePersonId: any
    employeePersonExpireDate: any
    mobile: any
    mobileEmergency: any
    companyId: string
    companyNameAr: any
    companyNameEn: any
    branchId: string
    branchNameAr: any
    branchNameEn: any
    manageId: string
    manageNameAr: any
    manageNameEn: any
    nationId: string
    nationNameAr: any
    nationNameEn: any
    departmentId: any
    departmentNameAr: any
    departmentNameEn: any
    jobId: string
    jobNameAr: string
    jobNameEn: string
    kafilId: string
    kafilNameAr: any
    kafilNameEn: any
    state: number
    birthDate: string
    birthPlace: any
    age: string
    motherName: any
    gender: number
    marrige: number
    healthId: any
    healthDate: any
    healthExpired: any
    healthPlace: any
    passportId: string
    passportDate: string
    passportPlace: any
    passportExpired: string
    insuranceId: any
    insuranceRecordNo: any
    insuranceValue: number
    insurancePer: number
}


export interface branch {
    employeesCount: number
    id: string
    nameAr: string
    nameEn: any
}

