import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountRoutingModule } from "./account-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

import { PageLoginComponent } from "./components/page-login/page-login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    PageLoginComponent,
    SignupComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
