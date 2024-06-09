import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityInfo, Profile } from 'src/app/shared/interfaces/profile';
import { MyProfileService } from 'src/app/shared/services/my-profile.service';

@Component({
  selector: 'app-emp-identity',
  templateUrl: './emp-identity.component.html',
  styleUrls: ['./emp-identity.component.css']
})
export class EmpIdentityComponent {
  constructor(private _MyProfileService: MyProfileService, private _router: Router) { }

  allDetails: Profile = {} as Profile
  identityDetails: IdentityInfo = {} as IdentityInfo
  IDNumber: any = null
  IDEnd: string = ''


  ngOnInit(): void {
    this._MyProfileService.srcData.subscribe({
      next: (data) => {
        if (data != null) {
          this.allDetails = data
          this.identityDetails = this.allDetails.identityInfo
          this.IDNumber = this.identityDetails.identityNumber
          this.IDEnd = this.identityDetails.expiredDate
          console.log(this.identityDetails);
        }
      }
    })
  }
}
