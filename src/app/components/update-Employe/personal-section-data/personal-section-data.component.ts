import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { empFullDetails } from 'src/app/shared/interfaces/dashboard';
import { UpdateDataService } from 'src/app/shared/services/update-data.service';

@Component({
  selector: 'app-personal-section-data',
  templateUrl: './personal-section-data.component.html',
  styleUrls: ['./personal-section-data.component.css']
})
export class PersonalSectionDataComponent {
  constructor(private _FormBuilder: FormBuilder, private _UpdateDataService: UpdateDataService, private _Router: Router, private _Renderer2: Renderer2) { }
  oneEmplyee: empFullDetails = {} as empFullDetails
  enableEdit: boolean = false
  showData: boolean = false


  personalDataForm: FormGroup = this._FormBuilder.group({

    // معلومات الاتصال
    mobile: [{ value: null, disabled: true }],
    mobileEmergency: [{ value: null, disabled: true }],

    // معلومات الجنسية
    nationId: [{ value: null, disabled: true }],
    nationNameAr: [{ value: null, disabled: true }],
    nationNameEn: [{ value: null, disabled: true }],

    // الحالة
    state: [{ value: null, disabled: true }],
    blood: [{ value: null, disabled: true }],
  })

  


  editSingleRow(element: any, target: any) {
    let x = this.personalDataForm.get(element)?.enable()

    const button = target as HTMLElement
    let updateButton = button.parentElement?.children[0] as HTMLElement
    let saveButton = button.parentElement?.children[1] as HTMLElement
    let cancelButton = button.parentElement?.children[2] as HTMLElement

    updateButton.style.display = 'none'
    saveButton.style.display = 'flex'
    cancelButton.style.display = 'flex'
  }

  closeEdittingInput(formCntrolName: any, target: any, originalValue: any, action: string) {
    let input = this.personalDataForm.get(formCntrolName)

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


  ngOnInit(): void {
    this.getEmpData()
  }

  

  getEmpData() {
    this._UpdateDataService.employeeData.subscribe(
      (value) => {
        console.log(value);
        this.oneEmplyee = value
        this.personalDataForm.patchValue(this.oneEmplyee)

      }
    )

  }


}
