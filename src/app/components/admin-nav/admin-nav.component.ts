import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoanService } from 'src/app/shared/services/loan.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent {
  constructor(private _LoanService: LoanService, private _Router: Router, private _TranslateService: TranslateService) { }
  employeeName: any = ''
  opened: boolean = false
  closed: boolean = true

  ngOnInit(): void {
    this._LoanService.basicLoanData().subscribe({
      next: (Response) => {
        this.employeeName = Response.name.split(' ', 1)
      },

      error: (err) => {
        console.log(err);
        if (err.error.message == 'Unauthorized') {
          localStorage.clear()
          this._Router.navigate(['login'])
        }
      }
    })
  }



  switchLanguage() {
    //     en                                   en           
    if (this._TranslateService.currentLang == 'en') {
      this._TranslateService.use('ar');
      localStorage.setItem('myLanguage', 'ar')
    }
    else {
      this._TranslateService.use('en');
      localStorage.setItem('myLanguage', 'en')
    }
  }




  openNav() {
    this.closed = false
    this.opened = true

  }
  closeNav() {
    this.closed = true
    this.opened = false
  }



}




