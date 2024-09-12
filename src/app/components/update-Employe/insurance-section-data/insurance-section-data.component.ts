import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { empFullDetails } from 'src/app/shared/interfaces/dashboard';
import { UpdateDataService } from 'src/app/shared/services/update-data.service';
@Component({
  selector: 'app-insurance-section-data',
  templateUrl: './insurance-section-data.component.html',
  styleUrls: ['./insurance-section-data.component.css']
})
export class InsuranceSectionDataComponent {
  constructor(private _FormBuilder: FormBuilder, private _UpdateDataService: UpdateDataService, private _Router: Router, private _Renderer2: Renderer2) { }
  oneEmplyee: empFullDetails = {} as empFullDetails
  enableEdit: boolean = false
  showData: boolean = false


  InsuranceFormData:FormGroup = this._FormBuilder.group({
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
  }

  

  getEmpData() {
    this._UpdateDataService.employeeData.subscribe(
      (value) => {
        console.log(value);
        this.oneEmplyee = value
        this.InsuranceFormData.patchValue(this.oneEmplyee)
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


}
