import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { branch, empFullDetails } from 'src/app/shared/interfaces/dashboard';
import { modifiedEmployee } from 'src/app/shared/interfaces/update-data';
import { UpdateDataService } from 'src/app/shared/services/update-data.service';

@Component({
  selector: 'app-personal-section-data',
  templateUrl: './personal-section-data.component.html',
  styleUrls: ['./personal-section-data.component.css']
})
export class PersonalSectionDataComponent {
  constructor(private _FormBuilder: FormBuilder, private _UpdateDataService: UpdateDataService, private _Router: Router, private _Renderer2: Renderer2) { }
  oneEmpolyee: empFullDetails = {} as empFullDetails
  itemsList: any[] = []
  enableEdit: boolean = false
  showData: boolean = false
  modifiedEmployee: modifiedEmployee = this._UpdateDataService.newEmpData;
  originalAllGroups: branch[] = []
  allgroups: branch[] = []
  nationList: branch[] = []
  enableEditName: string = ''
  branchChosen: boolean = true


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

    this.enableEditName = ''
  }

  ngOnInit(): void {
    this.getEmpData()
    this.getAllNations()
  }

  getEmpData() {
    this._UpdateDataService.employeeData.subscribe(
      (value) => {
        console.log(value);
        this.oneEmpolyee = value
        this.personalDataForm.patchValue(this.oneEmpolyee)

      }
    )

  }

  equalizeData() {
    // نقوم بجلب الخصائص الموجودة في الـ partialObject فقط
    const updatedObject = Object.assign({}, ...Object.keys(this.modifiedEmployee)
      .filter(key => key in this.oneEmpolyee)
      .map(key => ({ [key]: this.oneEmpolyee[key as keyof empFullDetails] })));
    this.modifiedEmployee = updatedObject
  }

  setUpdates() {
    this.equalizeData()
    this.modifiedEmployee.mobile = this.personalDataForm.get('mobile')?.value
    this.modifiedEmployee.mobileEmergency = this.personalDataForm.get('mobileEmergency')?.value
    this.modifiedEmployee.nationId = this.personalDataForm.get('nationId')?.value
    this.modifiedEmployee.state = this.personalDataForm.get('state')?.value
    this.modifiedEmployee.blood = this.personalDataForm.get('blood')?.value
  }

  sendUpdates() {
    this.setUpdates()
    console.log(this.modifiedEmployee);
  }

  // =========================== start ===========================
  // تعديل احد الخانات الاختيارية مثل الشركة او الفرع .. الخ
  getAllGroubOf(key: string, control: string) {
    this._UpdateDataService.getAllGroubOf(key).subscribe({
      next: (response) => {
        this.allgroups = response
        this.allgroups = this.allgroups.sort((a, b) => Number(a.id) - Number(b.id))
        this.originalAllGroups = this.allgroups
        console.log(response);
        this.groubSearching(control)
        this.enableEditName = control
        // بديله اسم الخانة اللي بيتم التعديل عليها و دي اللي هيظهر الليست تحتها
      }
    })
  }

  groubSearching(control: string) {
    this.personalDataForm.get(control)?.valueChanges
      .pipe(debounceTime(300)).subscribe(value => {  // تأخير التنفيذ بـ 300 مللي ثانية لتحسين الأداء
        this.searchByName(value)
        this.branchChosen = false
      });
  }

  searchByName(value: string) {
    this.allgroups = this.originalAllGroups.filter((item) => { return item.nameAr.includes(value) || (item.nameEn ? (item.nameEn).toLocaleLowerCase().includes(value.toLocaleLowerCase()) :'') || item.id.includes(value) })
    console.log(this.allgroups);
  }

  setChosenValue(item: branch, ControlNameAr: string, ControlNameEn: string, ControlID: string, target: any, thisControl: string) {
    this.personalDataForm.get(ControlNameAr)?.setValue(item.nameAr);
    this.personalDataForm.get(ControlNameEn)?.setValue(item.nameEn);
    this.personalDataForm.get(ControlID)?.setValue(item.id);
    this.enableEditName = ''
    this.branchChosen = true

    this.closeEdittingInput(thisControl, target, '', 'save')
    console.log(item);
  }

  getAllNations() {
    this._UpdateDataService.getAllGroubOf('nation').subscribe({
      next: (data) => {
        this.nationList = data
        console.log(data);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  // تعديل احد الخانات الاختيارية مثل الشركة او الفرع .. الخ
  // =========================== end ===========================


  setNation(controlName:string) {
    let nationName: string = this.personalDataForm.get(controlName)?.value
    let myNation = this.nationList.filter((item) => { return item.nameAr == nationName || item.nameEn == nationName })

    this.personalDataForm.get('nationNameAr')?.setValue(myNation[0].nameAr)
    this.personalDataForm.get('nationNameEn')?.setValue(myNation[0].nameEn)
    this.personalDataForm.get('nationId')?.setValue(myNation[0].id)
    this.enableEditName = ''
    this.branchChosen = true

  }
}
