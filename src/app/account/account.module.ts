import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountRoutingModule } from "./account-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

import { PageLoginComponent } from "./components/page-login/page-login.component";
import { PageSignupComponent } from "./components/page-signup/page-signup.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    PageLoginComponent,
    PageSignupComponent,
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
