export interface Response {
    accessToken: string
    employeeInfo: EmployeeInfo
}

export interface EmployeeInfo {
    empId: string
    name: string
    isAdmin: boolean
}
