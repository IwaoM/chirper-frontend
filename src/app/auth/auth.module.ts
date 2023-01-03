import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

import { PageLoginComponent } from "./components/page-login/page-login.component";
import { PageSignupComponent } from "./components/page-signup/page-signup.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    PageLoginComponent,
    PageSignupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule {}
