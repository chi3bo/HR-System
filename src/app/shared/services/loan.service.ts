import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private _HttpClient: HttpClient) { }



  setHeadrs(): any {
    return { headers: { 'Authorization': localStorage.getItem('userToken') } }

  }


  basicLoanData(): Observable<any> {
    return this._HttpClient.post('https://hrapp.runasp.net/Api/Employee/GetBasicAdvancePaymentInfo', '', this.setHeadrs())
  }

  getAllLoan(): Observable<any> {
    return this._HttpClient.post('https://hrapp.runasp.net/Api/Employee/GetEmployeeAdvancePayments', '', this.setHeadrs())
  }

  requestLoan(body:any): Observable<any> {
    return this._HttpClient.post('https://hrapp.runasp.net/Api/Employee/RequestAdvancePayment', body, this.setHeadrs())
  }

}
