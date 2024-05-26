import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.css']
})
export class LettersComponent {
  constructor(private _FormBuilder: FormBuilder, private _Renderer2: Renderer2) { }

  @ViewChild('fileInpu') userFile!: ElementRef;
  @ViewChild('successModal') successModal!: ElementRef;
  @ViewChild('mainSection') mainSection!: ElementRef;
  todayDate: any = new Date().toISOString().split('T')[0]
  empName: any = localStorage.getItem('employeeName')
  userToken: any = jwtDecode(localStorage.getItem('userToken')!)
  empId: any = this.userToken.empId


  lettersForm: FormGroup = this._FormBuilder.group({
    letterType: [null, Validators.required], //   نوع الخطاب
    Recipient: [null, Validators.required], // الجهة المستلمة  
    certified: [null, Validators.required], // موثق من غرفة التجارة  
    details: [null, Validators.required], // تفاصيل اخري
    myFile: [null, Validators.required],
  })

  ngOnInit(): void {
    setTimeout(() => { this._Renderer2.addClass(this.mainSection.nativeElement, 'slideIn') }, 0);
  }





  sendRequest() {
    if (this.lettersForm.valid) {
      this._Renderer2.removeClass(this.successModal.nativeElement, 'd-none')
      this._Renderer2.addClass(this.mainSection.nativeElement, 'd-none')
    }
    else {
      this.lettersForm.markAllAsTouched()
    }

  }

}
