import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PageLoginComponent } from "./components/page-login/page-login.component";
import { PageSignupComponent } from "./components/page-signup/page-signup.component";
import { SettingsComponent } from "./components/settings/settings.component";

import { AccountGuard } from "../core/guards/account.guard";

const routes: Routes = [
  { path: "login", component: PageLoginComponent },
  { path: "signup", component: PageSignupComponent },
  { path: "settings", component: SettingsComponent, canActivate: [AccountGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AccountRoutingModule {}