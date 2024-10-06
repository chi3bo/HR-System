import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { branch } from 'src/app/shared/interfaces/dashboard';
import { UpdateDataService } from 'src/app/shared/services/update-data.service';

@Component({
  selector: 'app-definitions',
  templateUrl: './definitions.component.html',
  styleUrls: ['./definitions.component.css']
})
export class DefinitionsComponent {
  constructor(private _FormBuilder: FormBuilder, private _UpdateDataService: UpdateDataService,
    private _Router: Router, private _toaster: ToastrService, private _TranslateService: TranslateService, private _spinner: NgxSpinnerService) { }

  itemsList: branch[] = []
  originalAllItems: branch[] = []

  get currentLang() {
    return this._TranslateService.currentLang
  }

  settingForm: FormGroup = this._FormBuilder.group({
    searchInput: [null]
  })

  getAllItems(item: any) {
    this._spinner.show('spinner3')
    this._UpdateDataService.getAllGroubOf(item).subscribe({
      next: (respo) => {
        this._spinner.hide('spinner3')
        console.log(respo);
        this.itemsList = respo
        this.itemsList = this.itemsList.sort((a, b) => Number(a.id) - Number(b.id))
        this.originalAllItems = this.itemsList
      },
      error: (err) => {
        console.log(err)
        this._spinner.hide('spinner3')

      }
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllItems('branch')
    this.searchingItems()

  }

  searchingItems() {
    this.settingForm.get('searchInput')?.valueChanges.pipe(debounceTime(300))
      .subscribe(value => {
        if (value) {
          this.itemsList = this.originalAllItems.filter((item) => {
            const isArabic = /[\u0600-\u06FF]/.test(value); // التحقق مما إذا كان النص يحتوي على حروف عربية
            const searchValue = isArabic ? value : value.toLowerCase(); // إذا كان النص عربي نتركه كما هو

            const nameEn = item.nameEn ? item.nameEn.toLowerCase() : '';
            const namaAr = item.nameAr ? item.nameAr : ''

            return namaAr.includes(value) || nameEn.includes(searchValue) || item.id.includes(value)
          });
        }
        else {
          this.itemsList = this.originalAllItems
        }
      })
  }
}


