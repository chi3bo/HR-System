import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-nav',
  templateUrl: './auth-nav.component.html',
  styleUrls: ['./auth-nav.component.css']
})
export class AuthNavComponent implements OnInit {
constructor(private _TranslateService:TranslateService){}


ngOnInit(): void {
  this._TranslateService.setDefaultLang('ar')
}

  switchLanguage(language: string) {
    this._TranslateService.use(language);
  }


}
