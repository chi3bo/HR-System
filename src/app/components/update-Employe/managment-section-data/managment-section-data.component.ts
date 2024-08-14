import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { empFullDetails } from 'src/app/shared/interfaces/dashboard';
import { UpdateDataService } from 'src/app/shared/services/update-data.service';

@Component({
  selector: 'app-managment-section-data',
  templateUrl: './managment-section-data.component.html',
  styleUrls: ['./managment-section-data.component.css']
})
export class ManagmentSectionDataComponent {
  constructor(private _FormBuilder: FormBuilder, private _UpdateDataService: UpdateDataService, private _Router: Router, private _Renderer2: Renderer2) { }
  oneEmplyee: empFullDetails = {} as empFullDetails
  itemsList: any[] = []
  enableEdit: boolean = false
  showData: boolean = false
  
  ManagementFormData:FormGroup = this._FormBuilder.group({

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

  })



  ngOnInit(): void {
    this.getEmpData()
  }

  

  getEmpData() {
    this._UpdateDataService.employeeData.subscribe(
      (value) => {
        console.log(value);
        this.oneEmplyee = value
        this.ManagementFormData.patchValue(this.oneEmplyee)

      }
    )

  }


  editSingleRow(element: any, target: any) {
    let x = this.ManagementFormData.get(element)?.enable()

    const button = target as HTMLElement
    let updateButton = button.parentElement?.children[0] as HTMLElement
    let saveButton = button.parentElement?.children[1] as HTMLElement
    let cancelButton = button.parentElement?.children[2] as HTMLElement

    updateButton.style.display = 'none'
    saveButton.style.display = 'flex'
    cancelButton.style.display = 'flex'
  }

  closeEdittingInput(formCntrolName: any, target: any, originalValue: any, action: string) {
    let input = this.ManagementFormData.get(formCntrolName)

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


  

  editJobs(key: string) {
    this._UpdateDataService.getAllGroubOf(key).subscribe({
      next: (Response) => {
        console.log(Response, 'get all group of');
        this.itemsList = Response
        this.itemsList = this.itemsList.sort((a, b) => Number(a.id) - Number(b.id))
      },
      error: (err) => {
        console.log(err);
      }
    })

  }



}
