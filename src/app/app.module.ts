import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthNavComponent } from './components/auth-nav/auth-nav.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MainComponent } from './components/main/main.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { LoanComponent } from './components/loan/loan.component';
import { VacationComponent } from './components/vacation/vacation.component';
import { TerminationComponent } from './components/termination/termination.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HelpComponent } from './components/help/help.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { OrderVacComponent } from './components/order-vac/order-vac.component';
import { OrderloanComponent } from './components/orderloan/orderloan.component';
import { OrderotherComponent } from './components/orderother/orderother.component';
import { BlankComponent } from './components/blank/blank.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminLoanComponent } from './components/admin-loan/admin-loan.component';
import { AdminVacationComponent } from './components/admin-vacation/admin-vacation.component';
import { ToastrModule } from 'ngx-toastr';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LeavePermissionComponent } from './components/leave-permission/leave-permission.component';
import { LettersComponent } from './components/letters/letters.component';
import { AssetRequestComponent } from './components/asset-request/asset-request.component';
import { EmpAssetsComponent } from './components/emp-assets/emp-assets.component';
import { EmpLettersComponent } from './components/emp-letters/emp-letters.component';
import { EmpPermissionsComponent } from './components/emp-permissions/emp-permissions.component';
import { AdminAssetsComponent } from './components/admin-assets/admin-assets.component';
import { AdminLettersComponent } from './components/admin-letters/admin-letters.component';
import { AdminLeaveComponent } from './components/admin-leave/admin-leave.component';
import { FakeNavComponent } from './components/fake-nav/fake-nav.component';
import { TimeSheetComponent } from './components/time-sheet/time-sheet.component';
import { EnterKeyFocusDirective } from './shared/enter-key-focus.directive';
import { CalcTimePipe } from './shared/calc-time.pipe';
import { CalcLatePipe } from './shared/calc-late.pipe';
import { CalcEarlyPipe } from './shared/calc-early.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import { EmpCarComponent } from './components/emp-car/emp-car.component';
import { EmpPassportComponent } from './components/emp-passport/emp-passport.component';
import { EmpContractComponent } from './components/emp-contract/emp-contract.component';
import { EmpIdentityComponent } from './components/emp-identity/emp-identity.component';
import { ProfileNavComponent } from './components/profile-nav/profile-nav.component';
import { DisplayTimesheetComponent } from './components/display-timesheet/display-timesheet.component';
import { SendTimesheetComponent } from './components/send-timesheet/send-timesheet.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FullTimePipe } from './shared/full-time.pipe';
import { FullTime2Pipe } from './shared/full-time2.pipe';
import { Time12hoursPipe } from './shared/time12hours.pipe';
import { MinToHoursPipe } from './shared/min-to-hours.pipe';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AuthNavComponent,
    MainNavComponent,
    LoginComponent,
    SignupComponent,
    MainComponent,
    AuthComponent,
    HomeComponent,
    LoanComponent,
    VacationComponent,
    TerminationComponent,
    HelpComponent,
    AllOrdersComponent,
    OrderVacComponent,
    OrderloanComponent,
    OrderotherComponent,
    BlankComponent,
    AdminComponent,
    AdminLoanComponent,
    AdminVacationComponent,
    AdminHomeComponent,
    AdminNavComponent,
    LeavePermissionComponent,
    LettersComponent,
    AssetRequestComponent,
    EmpAssetsComponent,
    EmpLettersComponent,
    EmpPermissionsComponent,
    AdminAssetsComponent,
    AdminLettersComponent,
    AdminLeaveComponent,
    FakeNavComponent,
    TimeSheetComponent,
    EnterKeyFocusDirective,
    CalcTimePipe,
    CalcLatePipe,
    CalcEarlyPipe,
    ProfileComponent,
    EmpCarComponent,
    EmpPassportComponent,
    EmpContractComponent,
    EmpIdentityComponent,
    ProfileNavComponent,
    DisplayTimesheetComponent,
    SendTimesheetComponent,
    FullTimePipe,
    FullTime2Pipe,
    Time12hoursPipe,
    MinToHoursPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SweetAlert2Module.forRoot()

  ],


  schemas: [CUSTOM_ELEMENTS_SCHEMA],


  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
