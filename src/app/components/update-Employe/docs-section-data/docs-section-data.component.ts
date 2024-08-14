import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { empFullDetails } from 'src/app/shared/interfaces/dashboard';
import { UpdateDataService } from 'src/app/shared/services/update-data.service';

@Component({
  selector: 'app-docs-section-data',
  templateUrl: './docs-section-data.component.html',
  styleUrls: ['./docs-section-data.component.css']
})
export class DocsSectionDataComponent {
  constructor(private _FormBuilder: FormBuilder, private _UpdateDataService: UpdateDataService, private _Router: Router, private _Renderer2: Renderer2) { }
  oneEmplyee: empFullDetails = {} as empFullDetails
  enableEdit: boolean = false
  showData: boolean = false

  DocsFormData:FormGroup = this._FormBuilder.group({
    // معلومات الهوية الشخصية
    cardId: [{ value: null, disabled: true }],
    cardDate: [{ value: null, disabled: true }],
    cardPlace: [{ value: null, disabled: true }],
    cardExpired: [{ value: null, disabled: true }],
    
    // معلومات الجواز
    passportId: [{ value: null, disabled: true }],
    passportDate: [{ value: null, disabled: true }],
    passportPlace: [{ value: null, disabled: true }],
    passportExpired: [{ value: null, disabled: true }],

    // معلومات الصحة
    healthId: [{ value: null, disabled: true }],
    healthDate: [{ value: null, disabled: true }],
    healthExpired: [{ value: null, disabled: true }],
    healthPlace: [{ value: null, disabled: true }],
  })


  ngOnInit(): void {
    this.getEmpData()

  }
  

  

  getEmpData() {
    this._UpdateDataService.employeeData.subscribe(
      (value) => {
        console.log(value);
        this.oneEmplyee = value
        this.DocsFormData.patchValue(this.oneEmplyee)
      }
    )

  }



  editSingleRow(element: any, target: any) {
    let x = this.DocsFormData.get(element)?.enable()

    const button = target as HTMLElement
    let updateButton = button.parentElement?.children[0] as HTMLElement
    let saveButton = button.parentElement?.children[1] as HTMLElement
    let cancelButton = button.parentElement?.children[2] as HTMLElement

    updateButton.style.display = 'none'
    saveButton.style.display = 'flex'
    cancelButton.style.display = 'flex'
  }

  closeEdittingInput(formCntrolName: any, target: any, originalValue: any, action: string) {
    let input = this.DocsFormData.get(formCntrolName)

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
