import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountRoutingModule } from "./account-routing.module";

import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { SettingsComponent } from "./components/settings/settings.component";



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
