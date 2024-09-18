import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { empFullDetails } from 'src/app/shared/interfaces/dashboard';
import { UpdateDataService } from 'src/app/shared/services/update-data.service';
import { modifiedEmployee } from 'src/app/shared/interfaces/update-data';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-insurance-section-data',
  templateUrl: './insurance-section-data.component.html',
  styleUrls: ['./insurance-section-data.component.css']
})
export class InsuranceSectionDataComponent {
  constructor(private _FormBuilder: FormBuilder, private _UpdateDataService: UpdateDataService,  private _Router: Router,  private _toaster: ToastrService) { }
  oneEmployee: empFullDetails = {} as empFullDetails
  enableEdit: boolean = false
  showData: boolean = false
  modifiedEmployee: modifiedEmployee = this._UpdateDataService.newEmpData;
  isFormChanged: boolean = false;



  InsuranceFormData: FormGroup = this._FormBuilder.group({
    // معلومات التأمين
    insuranceId: [{ value: null, disabled: true }],
    insuranceRecordNo: [{ value: null, disabled: true }],
    insuranceValue: [{ value: null, disabled: true }],
    insurancePer: [{ value: null, disabled: true }],
    insuranceCompany: [{ value: null, disabled: true }],
    insuranceSalary: [{ value: null, disabled: true }],
    insuranceDangGP: [{ value: null, disabled: true }],
    insuranceDate: [{ value: null, disabled: true }],
    insuranceDateE: [{ value: null, disabled: true }],
  })


  ngOnInit(): void {
    this.getEmpData()
    this.monitorFormChanges()
  }

  monitorFormChanges() {
    this.InsuranceFormData.valueChanges.subscribe(() => {
      // تحقق إذا تم تعديل النموذج
      this.isFormChanged = this.InsuranceFormData.dirty; // dirty تتحقق مما إذا كان هناك أي تعديل
    });
  }

  getEmpData() {
    this._UpdateDataService.employeeData.subscribe(
      (value) => {
        console.log(value);
        this.oneEmployee = value
        this.InsuranceFormData.patchValue(this.oneEmployee)
        // يوجد في البيانات بعض التواريخ مسجلة كنص كتابي من نوع سترينج علي شكل اندرسكور -___\__\__ عشان كدة لازم نتأكد انه رقم
        this.oneEmployee.insuranceDate && this.oneEmployee.insuranceDate.includes('0') ? this.oneEmployee.insuranceDate = new Date(this.oneEmployee.insuranceDate).toISOString().substring(0, 10) : ''
        this.oneEmployee.insuranceDateE && this.oneEmployee.insuranceDateE.includes('0') ? this.oneEmployee.insuranceDateE = new Date(this.oneEmployee.insuranceDateE).toISOString().substring(0, 10) : ''
      }
    )

  }




  editSingleRow(element: any, target: any) {
    let x = this.InsuranceFormData.get(element)?.enable()

    const button = target as HTMLElement
    let updateButton = button.parentElement?.children[0] as HTMLElement
    let saveButton = button.parentElement?.children[1] as HTMLElement
    let cancelButton = button.parentElement?.children[2] as HTMLElement

    updateButton.style.display = 'none'
    saveButton.style.display = 'flex'
    cancelButton.style.display = 'flex'
  }

  closeEdittingInput(formCntrolName: any, target: any, originalValue: any, action: string) {
    let input = this.InsuranceFormData.get(formCntrolName)

    action == 'cancel' ? input?.setValue(originalValue) : ''

    input?.disable()
    // input?.value != originalValue ? this._Renderer2.addClass(input , 'is-valid') : '' مش هينفع عشان ده فورم كنترول وليس انبوت

    const button = target as HTMLElement
    let updateButton = button.parentElement?.children[0] as HTMLElement
    let saveButton = button.parentElement?.children[1] as HTMLElement
    let cancelButton = button.parentElement?.children[2] as HTMLElement
    updateButton.style.display = 'flex'
    saveButton.style.display = 'none'
    cancelButton.style.display = 'none'

  }

  equalizeData() {
    // نقوم بجلب الخصائص الموجودة في الـ partialObject فقط
    const updatedObject = Object.assign({}, ...Object.keys(this.modifiedEmployee)
      .filter(key => key in this.oneEmployee)
      .map(key => ({ [key]: this.oneEmployee[key as keyof empFullDetails] })));
    this.modifiedEmployee = updatedObject
  }

  setUpdates() {
    this.equalizeData()
    this.modifiedEmployee.insuranceId = this.ifValueSetString( this.InsuranceFormData.get('insuranceId')?.value)
    this.modifiedEmployee.insuranceRecordNo =  this.ifValueSetString(this.InsuranceFormData.get('insuranceRecordNo')?.value)
    this.modifiedEmployee.insuranceValue = this.ifValueSetString( this.InsuranceFormData.get('insuranceValue')?.value)
    this.modifiedEmployee.insurancePer = this.ifValueSetString( this.InsuranceFormData.get('insurancePer')?.value)
    this.modifiedEmployee.insuranceCompany = this.InsuranceFormData.get('insuranceCompany')?.value
    this.modifiedEmployee.insuranceSalary = this.ifValueSetString( this.InsuranceFormData.get('insuranceSalary')?.value)
    this.modifiedEmployee.insuranceDangGP = this.InsuranceFormData.get('insuranceDangGP')?.value
    this.modifiedEmployee.insuranceDate = this.InsuranceFormData.get('insuranceDate')?.value
    this.modifiedEmployee.insuranceDateE = this.InsuranceFormData.get('insuranceDateE')?.value
  }

  sendUpdates() {
    this.setUpdates()
    console.log(this.modifiedEmployee);
    
    this._UpdateDataService.AddOrUpdateEmployee(this.modifiedEmployee).subscribe({
      next: (res) => {
        if (res.isSuccess == true) {
          this.getEmployeeDetails(this.modifiedEmployee.employeeId)
          this._toaster.success('تم تحديث بيانات الموظف بنجاح' , "تم التعديل", {positionClass: 'toast-bottom-right'})
        }
        else{
          this._toaster.error('لم يتم تحديث بيانات الموظف .. حاول لاحقاً' , "فشل التعديل" ,  {positionClass: 'toast-bottom-right'})
        }
        console.log(res)
      },
      error: (err) => { 
        this._toaster.error('لم يتم تحديث بيانات الموظف .. حاول لاحقاً ' , "فشل التعديل" ,  {positionClass: 'toast-bottom-right'})
        console.log(err) }
    })
  }

  
  ifValueSetString(value: any) {
    if (value) {
      return String(value)
    }
    else {
      return value
    }
  }

  
  getEmployeeDetails(empID: string) {
    this._UpdateDataService.getEmpFullData(empID).subscribe({
      next: (data) => {
        this._UpdateDataService.employeeData.next(data)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}
