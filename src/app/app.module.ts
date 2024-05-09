import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
    TerminationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
