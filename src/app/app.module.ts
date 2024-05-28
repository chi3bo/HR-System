import { NgModule } from '@angular/core';
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
    EmpPermissionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],


  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
