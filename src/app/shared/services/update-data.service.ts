import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { empFullDetails } from '../interfaces/dashboard';
import { modifiedEmployee } from '../interfaces/update-data';


@Injectable({
  providedIn: 'root'
})
export class UpdateDataService {

  constructor(private _HttpClient: HttpClient, private _Router: Router, private _FormBuilder: FormBuilder) { }
  employeeData: BehaviorSubject<empFullDetails> = new BehaviorSubject({} as empFullDetails)
  newEmpData:modifiedEmployee = {  
    employeeId:'',
    employeeNameAr: '',
    employeeNameEn: '',
    blood: '',
    employeePersonId: '',
    employeePersonExpireDate: '',
    mobile: '',
    mobileEmergency: '',
    companyId: '',
    branchId: '',
    manageId: '',
    nationId: '',
    departmentId: '',
    jobId: '',
    kafilId: '',
    state: 0,
    birthDate: '',
    birthPlace: '',
    motherName: '',
    gender: 0,
    marrige: 0,
    healthId: '',
    healthDate: '',
    healthExpired: '',
    healthPlace: '',
    passportId: '',
    passportDate: '',
    passportPlace: '',
    passportExpired: '',
    insuranceId: '',
    insuranceRecordNo: '',
    insuranceValue: 0,
    insurancePer: 0,
    insuranceCompany: 0,
    insuranceSalary: 0,
    insuranceDangGP: 0,
    insuranceDate: '',
    insuranceDateE: '',
    employeeCategoryId: '',
    cardId: '',
    cardDate: '',
    cardPlace: '',
    cardExpired: ''
  }
  

  setHeadrs(): any {
    return { headers: { 'Authorization': localStorage.getItem('userToken') } }
  }

  searchEmployee(searchKey: string): Observable<any> {
    return this._HttpClient.get(`https://hrapp.runasp.net/Api/Employee/GetSearch?searchKey=${searchKey}`, this.setHeadrs())
  }

  getEmpFullData(id: any): Observable<any> {
    return this._HttpClient.post(`https://hrapp.runasp.net/Api/Dashboard/GetEmployeeTreeById?employeeId=${id}`, '', this.setHeadrs())
  }

  getAllGroubOf(groubName: string): Observable<any> {
    return this._HttpClient.post(`https://hrapp.runasp.net/Api/${groubName}/GetAll`, '', this.setHeadrs())
  }

}
