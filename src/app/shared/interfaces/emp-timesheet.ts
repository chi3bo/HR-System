export interface EmpTimesheet {
    id: number
    employeeId: string
    employeeName: string
    date: string
    start: string
    leave: string
    earlyByMinute: number
    lateByMinute: number
    workingTimeByMinute: number
    projectId: number
    absent: boolean
}
