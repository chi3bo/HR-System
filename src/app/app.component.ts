import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _TranslateService: TranslateService) { }

  title = 'saudiaFormica';

  ngOnInit(): void {
    const favLanguage: string = localStorage.getItem('myLanguage')!

    // اذا كانت هناك لغة مختارة  اجعلها هي الاساسية 
    if (favLanguage) {
      this._TranslateService.setDefaultLang(favLanguage)
      this._TranslateService.use(favLanguage);
    }

    // اذا لم تكن هناك لغة مختارة اجعل العربية اللغة الاساسية 
    else {
      this._TranslateService.setDefaultLang('ar')
      this._TranslateService.use('ar');

    }

  }





}
