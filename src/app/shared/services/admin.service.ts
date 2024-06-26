import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) { }

  setHeadrs(): any {
    return { headers: { 'Authorization': localStorage.getItem('userToken') } }
  }


  getAllRequestLoan(userId: any = ''): Observable<any> {
    return this._HttpClient.get(`https://hrapp.runasp.net/Api/Admin/GetPindingAdvancePayments?Search=${userId}`, this.setHeadrs())
  }

  getAllRequestVacation(userId: any = ''): Observable<any> {
    return this._HttpClient.get(`https://hrapp.runasp.net/Api/Admin/GetPindingRequestVacations?Search=${userId}`, this.setHeadrs())
  }

  getAllAssets(userId: any = ''): Observable<any> {
    return this._HttpClient.get(`https://hrapp.runasp.net/Api/Admin/GetPindingRequestCustodies?Search=${userId}`, this.setHeadrs())
  }
  getAllLetters(userId: any = ''): Observable<any> {
    return this._HttpClient.get(`https://hrapp.runasp.net/Api/Admin/GetPindingRequestLetters?Search=${userId}`, this.setHeadrs())
  }
  getAllPermissions(userId: any = ''): Observable<any> {
    return this._HttpClient.get(`https://hrapp.runasp.net/Api/Admin/GetPindingRequestPermissions?Search=${userId}`, this.setHeadrs())
  }

  LoanAction(orderId: number, Action: boolean): Observable<any> {
    return this._HttpClient.post(`https://hrapp.runasp.net/Api/Admin/DecisionOfAdvancePayment`,
      {
        "id": orderId,
        "accepted": Action
      },
      this.setHeadrs())
  }

  vacationAction(orderId: number, action: boolean, details: string): Observable<any> {
    return this._HttpClient.post(`https://hrapp.runasp.net/Api/Admin/DecisionOfVacation`,
      {
        id: orderId,
        accepted: action,
        note: details
      },
      this.setHeadrs()
    )
  }

  AssetsAction(orderId: number, action: boolean, details: string): Observable<any> {
    return this._HttpClient.post(`https://hrapp.runasp.net/Api/Admin/DecisionOfCustody`,
      {
        id: orderId,
        accepted: action,
        note: details
      },
      this.setHeadrs()
    )
  }

  LettersAction(orderId: number, action: boolean, details: string): Observable<any> {
    return this._HttpClient.post(`https://hrapp.runasp.net/Api/Admin/DecisionOfLetter`,
      {
        id: orderId,
        accepted: action,
        note: details
      },
      this.setHeadrs()
    )
  }

  PermissionsAction(orderId: number, action: boolean, details: string): Observable<any> {
    return this._HttpClient.post(`https://hrapp.runasp.net/Api/Admin/DecisionOfPermission`,
      {
        id: orderId,
        accepted: action,
        note: details
      },
      this.setHeadrs()
    )
  }

}
