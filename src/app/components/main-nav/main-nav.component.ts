import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/shared/services/loan.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  constructor(private _LoanService: LoanService, private _Router: Router) { }
  employeeName: any = ''
  opened: boolean = false
  closed: boolean = true

  ngOnInit(): void {
    if (localStorage.getItem('userToken') == (null || undefined)) {
      this._Router.navigate(['login'])
    }
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

  openNav() {
    this.closed = false
    this.opened = true

  }
  closeNav() {

    this.closed = true
    this.opened = false
  }



}


