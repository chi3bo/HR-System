import { Component, OnInit, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _TranslateService: TranslateService, private _AuthService: AuthService, private _Router: Router) { }

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
