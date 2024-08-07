import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { empFullDetails } from 'src/app/shared/interfaces/dashboard';
import { UpdateDataService } from 'src/app/shared/services/update-data.service';

@Component({
  selector: 'app-main-section-data',
  templateUrl: './main-section-data.component.html',
  styleUrls: ['./main-section-data.component.css']
})
export class MainSectionDataComponent {
  constructor(private _FormBuilder: FormBuilder, private _UpdateDataService: UpdateDataService, private _Router: Router, private _Renderer2: Renderer2) { }
  oneEmplyee: empFullDetails = {} as empFullDetails
  enableEdit: boolean = false
  showData: boolean = false



  employeeData: FormGroup = this._FormBuilder.group({
    empNameAR: [{ value: null, disabled: true }],
    empNameEN: [{ value: null, disabled: true }],
    empID: [{ value: null, disabled: true }],
    empPersonalID: [{ value: null, disabled: true }],
    empPersonalIDExpireDate: [{ value: null, disabled: true }],
    empBirthDate: [{ value: null, disabled: true }],
    empBirthBlace: [{ value: null, disabled: true }],
    empAge: [{ value: null, disabled: true }],
    empMotherName: [{ value: null, disabled: true }],
    empJender: [{ value: null, disabled: true }],
    empMarrige: [{ value: null, disabled: true }],

    // break --------------------
    // معلومات الاتصال
    mobile: [{ value: null, disabled: true }],
    mobileEmergency: [{ value: null, disabled: true }],

    // معلومات الشركة
    companyId: [{ value: null, disabled: true }],
    companyNameAr: [{ value: null, disabled: true }],
    companyNameEn: [{ value: null, disabled: true }],

    // معلومات الفروع والإدارة
    branchId: [{ value: null, disabled: true }],
    branchNameAr: [{ value: null, disabled: true }],
    branchNameEn: [{ value: null, disabled: true }],
    jobId: [{ value: null, disabled: true }],
    jobNameAr: [{ value: null, disabled: true }],
    jobNameEn: [{ value: null, disabled: true }],
    manageId: [{ value: null, disabled: true }],
    manageNameAr: [{ value: null, disabled: true }],
    manageNameEn: [{ value: null, disabled: true }],
    departmentId: [{ value: null, disabled: true }],
    departmentNameAr: [{ value: null, disabled: true }],
    departmentNameEn: [{ value: null, disabled: true }],
    empCategoryId: [{ value: null, disabled: true }],
    empCategoryNameAr: [{ value: null, disabled: true }],
    empCategoryNameEn: [{ value: null, disabled: true }],

    // معلومات الجنسية
    nationId: [{ value: null, disabled: true }],
    nationNameAr: [{ value: null, disabled: true }],
    nationNameEn: [{ value: null, disabled: true }],

    // معلومات الكفيل
    kafilId: [{ value: null, disabled: true }],
    kafilNameAr: [{ value: null, disabled: true }],
    kafilNameEnv: [{ value: null, disabled: true }],

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


    // معلومات الصحة
    healthId: [{ value: null, disabled: true }],
    healthDate: [{ value: null, disabled: true }],
    healthExpired: [{ value: null, disabled: true }],
    healthPlace: [{ value: null, disabled: true }],

    // الحالة
    state: [{ value: null, disabled: true }],
    blood: [{ value: null, disabled: true }],

  })


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getEmpData()
  }

  getEmpData() {
    this._UpdateDataService.employeeData.subscribe(
      (value) => {
        console.log(value);
        this.oneEmplyee = value
      }
    )

  }



  editSingleRow(element: any, target: any) {
    let x = this.employeeData.get(element)?.enable()

    const button = target as HTMLElement
    let updateButton = button.parentElement?.children[0] as HTMLElement
    let saveButton = button.parentElement?.children[1] as HTMLElement
    let cancelButton = button.parentElement?.children[2] as HTMLElement

    updateButton.style.display = 'none'
    saveButton.style.display = 'flex'
    cancelButton.style.display = 'flex'
  }

  closeEdittingInput(formCntrolName: any, target: any, originalValue: any, action: string) {
    let input = this.employeeData.get(formCntrolName)

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

