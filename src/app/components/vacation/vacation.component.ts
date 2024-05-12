import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { LoanService } from 'src/app/shared/services/loan.service';
import { Response } from './../../shared/interfaces/response';
import { FormBuilder, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { VacationService } from 'src/app/shared/services/vacation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnInit {
  constructor(private _VacationService: VacationService, private _FormBuilder: FormBuilder, private _router: Router) { }



  empName: any = ''
  empId: any = ''
  availableDays: number = 0
  takenDays: number = 0
  requestSent: boolean = false
  errorMaximumDays: boolean = false
  todayDate: any = new Date().toISOString().split('T')[0]


  vacationForm: FormGroup = this._FormBuilder.group({
    startDate: [null, Validators.required], //  بداية الاجازة
    numberOfDays: [null, Validators.required], // مدة الاجازة 
    details: [null, Validators.required], // تفاصيل اخري
    vacationType: [null, Validators.required],// نوع الاجازة 
  },)




  sendRequest() {

    console.log(this.vacationForm.value);
    console.log(this.vacationForm.valid, 'valid');
    if (this.vacationForm.get('numberOfDays')?.value <= this.availableDays && this.vacationForm.valid ) {
        this._VacationService.requestvacation(this.vacationForm.value).subscribe({
          next: (Response) => {
            if(Response == true){
              console.log(Response );
              this.requestSent = true
            }

          },

          error: (err) => {
            console.log(err);
            if (err.error.message == 'Unauthorized') {
              localStorage.clear()
              this._router.navigate(['login'])
            }
            this.requestSent = false
          }
        })

    }
    else{
      this.vacationForm.markAllAsTouched()
    }
  }



  ngOnInit(): void {
    this._VacationService.basicvacationData().subscribe({
      next: (Response) => {
        this.empName = Response.name
        this.empId = Response.empId
        this.availableDays = Response.availableDays
        this.takenDays = Response.takenDays
        console.log(Response);
      },

      error: (err) => {
        console.log(err);
        if (err.error.message == 'Unauthorized') {
          localStorage.clear()
          this._router.navigate(['login'])
        }
      }
    })
  }


}
// "startDate": "2024-05-11T12:31:15.972Z",
// "numberOfDays": 0,
// "details": "string",
// "vacationType": "1 = SickLeave"