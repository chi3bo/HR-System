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
import { HttpClientModule } from '@angular/common/http';
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
    AdminNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
