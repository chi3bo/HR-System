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
  itemsList: any[] = []
  enableEdit: boolean = false
  showData: boolean = false


  employeeData: FormGroup = this._FormBuilder.group({

    employeeNameAr: [{ value: null, disabled: true }],
    employeeNameEn: [{ value: null, disabled: true }],
    employeeId: [{ value: null, disabled: true }],
    employeePersonId: [{ value: null, disabled: true }],
    employeePersonExpireDate: [{ value: null, disabled: true }],
    birthDate: [{ value: null, disabled: true }],
    birthPlace: [{ value: null, disabled: true }],
    age: [{ value: null, disabled: true }],
    motherName: [{ value: null, disabled: true }],
    gender: [{ value: null, disabled: true }],
    marrige: [{ value: null, disabled: true }],
    
    
    // معلومات الكفيل
    kafilId: [{ value: null, disabled: true }],
    kafilNameAr: [{ value: null, disabled: true }],
    kafilNameEn: [{ value: null, disabled: true }],

    // معلومات الشركة
    companyId: [{ value: null, disabled: true }],
    companyNameAr: [{ value: null, disabled: true }],
    companyNameEn: [{ value: null, disabled: true }],

  })


  ngOnInit(): void {
    this.getEmpData()
  }



  getEmpData() {
    this._UpdateDataService.employeeData.subscribe(
      (value) => {
        console.log(value);
        this.oneEmplyee = value
        this.employeeData.patchValue(this.oneEmplyee)

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


  sendTest(any: any) {
    this.oneEmplyee.employeeNameAr = this.employeeData.get('empNameAR')?.value
    console.log(this.oneEmplyee);

    //  عند الضغط علي الزر تكون الخطوة النهائية هي  ارسال الاوبجيكت الاساسي بعد تعديله
    //  يتم التعديل حسب الانبوت الذي تغيرت قيمته فقط
    // اي ان اللي قيمته اتغيرت في الفورم عن القيمة الاساسية في الاوبجيكت ده اللي هنعدله 
    // الان نرسل الاوبجيكت الي الapi
    // يمكن ايضا ان نأخذ نسخة جديدة من الاوبجيكت الاساسي ثم نعدل عليها العناصر المطلوبة ثم نرسلها 
    //  بحيث نحتفظ بالقيم الاساسية للأوبجيكت الاساسي
  }

}

