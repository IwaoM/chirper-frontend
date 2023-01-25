import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PageProfileComponent } from "./components/page-profile/page-profile.component";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { UsersRoutingModule } from "./users-routing.module";
import { PageSettingsComponent } from "./components/page-settings/page-settings.component";
import { PasswordUpdateFormComponent } from "./components/password-update-form/password-update-form.component";
import { ProfileUpdateFormComponent } from "./components/profile-update-form/profile-update-form.component";
import { ThemeSelectorComponent } from "./components/theme-selector/theme-selector.component";
import { AccountDeleteFormComponent } from "./components/account-delete-form/account-delete-form.component";

@NgModule({
  declarations: [
    PageProfileComponent,
    PageSettingsComponent,
    PasswordUpdateFormComponent,
    ProfileUpdateFormComponent,
    ThemeSelectorComponent,
    AccountDeleteFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
