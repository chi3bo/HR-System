import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-leave-permission',
  templateUrl: './leave-permission.component.html',
  styleUrls: ['./leave-permission.component.css']
})
export class LeavePermissionComponent implements OnInit {
  constructor(private _FormBuilder: FormBuilder, private _Renderer2: Renderer2) { }

  @ViewChild('fileInpu') userFile!: ElementRef;
  @ViewChild('successModal') successModal!: ElementRef;
  @ViewChild('mainSection') mainSection!: ElementRef;
  todayDate: any = new Date().toISOString().split('T')[0]
  empName: any = localStorage.getItem('employeeName')
  userToken: any = jwtDecode(localStorage.getItem('userToken')!)
  empId: any = this.userToken.empId


  permissionForm: FormGroup = this._FormBuilder.group({
    startingTime: ["08:00", Validators.required], //  بداية الاجازة
    totalTime: [null, Validators.required], // مدة الاجازة 
    details: [null, Validators.required], // تفاصيل اخري
    myFile: [null, Validators.required],
  })




  ngOnInit(): void {
    this._Renderer2.addClass(this.mainSection.nativeElement, 'slideIn')

  }





  sendRequest() {
    if (this.permissionForm.valid) {
      this._Renderer2.removeClass(this.successModal.nativeElement, 'd-none')
      this._Renderer2.addClass(this.mainSection.nativeElement, 'd-none')
    }
    else{
      this.permissionForm.markAllAsTouched()
    }

  }





}
