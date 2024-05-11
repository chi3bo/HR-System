import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { LoanService } from 'src/app/shared/services/loan.service';
import { Response } from './../../shared/interfaces/response';
import { FormBuilder, FormControlOptions, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
  constructor(private _LoanService: LoanService, private _FormBuilder: FormBuilder) { }

  loanForm: FormGroup = this._FormBuilder.group({
    advancePaymentValue: [null, Validators.required], // قيمة السلفة
    installmentValue: [null, Validators.required], // قيمة القسط
    lastInstallmentValue: [null, Validators.required], // القسط الاخير
    numberOfInstallment: [null, Validators.required],// عدد الاقساط
    startDate: [null, Validators.required]// تاريخ البدء
  }, { validators: [this.Install], } as FormControlOptions)



  empName: any = ''
  empId: any = ''
  raseed: number = 0
  todayDate: any = new Date().toISOString().split('T')[0]



  // استنتاج عدد الاقساط من المبلغ
  calcNumberOfInstalls() {
    let loan = this.loanForm.get('advancePaymentValue') // مبلغ السلفة
    let install = this.loanForm.get('installmentValue') // القسط الواحد
    let numOfInstall = this.loanForm.get('numberOfInstallment') // عدد الاقساط
    let lastInstall = this.loanForm.get('lastInstallmentValue') // عدد الاقساط

    let newNum = Number(loan?.value) / Number(install?.value)// المبلغ علي القسط يعطينا عدد الاقساط
    let fixedNum = Math.floor(newNum)// عدد الاقساط بالتقريب الي رقم اقل
    let addition = newNum - fixedNum // الكسور المستخرجة من التقريب

    //   القسط الاخير = القسط + القسط مضروب في فارق التقريب  
    let newLastInstall = Number(install?.value) + (addition * Number(install?.value))

    if (install?.value != null && install.errors == null) {
      numOfInstall?.setValue(fixedNum)
      lastInstall?.setValue(Math.round(newLastInstall))
    }
    else {
      numOfInstall?.setValue(null)
      lastInstall?.setValue(null)
    }

  }
  // استنتاج قيمة القسط من العدد
  // calcInstallFromNumber() {
  //   let loan = this.loanForm.get('advancePaymentValue')
  //   let install = this.loanForm.get('installmentValue')
  //   let numOfInstall = this.loanForm.get('numberOfInstallment')
  //   let newInstall = Number(loan?.value) / Number(numOfInstall?.value)

  //   if (loan?.value != null) {
  //     install?.setValue(newInstall)
  //   }
  // }


  Install(myForm: FormGroup) {
    let install = myForm.get('installmentValue')
    let loan = myForm.get('advancePaymentValue')
    let numOfInstall = myForm.get('numberOfInstallment')


    if (install?.value < 100) {
      install?.setErrors({ minAmount: true })
    }

    else if (Number(install?.value) > Number(loan?.value)) {
      install?.setErrors({ moreThan: true })
    }
  }

  sendRequest() {
    this._LoanService.requestLoan(this.loanForm.value).subscribe({
      next: (Response) => {
        console.log(Response);
      },

      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this._LoanService.basicLoanData().subscribe({
      next: (Response) => {
        this.empName = Response.name
        this.empId = Response.empId
        this.raseed = Response.loansbal
        console.log(Response);
      },

      error: (err) => {
        console.log(err);
      }
    })
  }


}
