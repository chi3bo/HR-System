import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-asset-request',
  templateUrl: './asset-request.component.html',
  styleUrls: ['./asset-request.component.css']
})
export class AssetRequestComponent {
  constructor(private _FormBuilder: FormBuilder, private _Renderer2: Renderer2) { }

  @ViewChild('fileInpu') userFile!: ElementRef;
  @ViewChild('successModal') successModal!: ElementRef;
  @ViewChild('mainSection') mainSection!: ElementRef;
  todayDate: any = new Date().toISOString().split('T')[0]
  empName: any = localStorage.getItem('employeeName')
  userToken: any = jwtDecode(localStorage.getItem('userToken')!)
  empId: any = this.userToken.empId

  AssetForm: FormGroup = this._FormBuilder.group({
    AssetName: [null, Validators.required], //  بداية الاجازة
    saveAsset: [null, Validators.required], // مدة الاجازة 
    myFile: [null, Validators.required],
  })


  ngOnInit(): void {
    this._Renderer2.addClass(this.mainSection.nativeElement, 'slideIn')

  }





  sendRequest() {
    if (this.AssetForm.valid) {
      this._Renderer2.removeClass(this.successModal.nativeElement, 'd-none')
      this._Renderer2.addClass(this.mainSection.nativeElement, 'd-none')
    }
    else{
      this.AssetForm.markAllAsTouched()
    }
  }


}
