export interface Response {
    accessToken: string
    employeeInfo: EmployeeInfo
}

export interface EmployeeInfo {
    empId: string
    name: string
    isAdmin: boolean
}


export interface loanInterface {
    id: string
    advancePaymentValue: number
    installmentValue: number
    numberOfInstallment: number
    lastInstallmentValue: number
    startDate: string
    approveStatus: string
}

export interface vacationInterface {
    id: number
    startDate: string
    numberOfDays: number
    details: string
    vacationType: string
    approveStatus: string
    approveDetails: string
}
