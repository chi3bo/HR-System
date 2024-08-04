import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UpdateDataService {

  constructor(private _HttpClient: HttpClient, private _Router: Router) { }
  setHeadrs(): any {
    return { headers: { 'Authorization': localStorage.getItem('userToken') } }
  }


  searchEmployee(searchKey: string): Observable<any> {
    return this._HttpClient.get(`https://hrapp.runasp.net/Api/Employee/GetSearch?searchKey=${searchKey}`, this.setHeadrs())
  }


}
