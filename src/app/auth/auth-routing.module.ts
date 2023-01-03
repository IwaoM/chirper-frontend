import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PageLoginComponent } from "./components/page-login/page-login.component";
import { PageSignupComponent } from "./components/page-signup/page-signup.component";

const routes: Routes = [
  { path: "login", component: PageLoginComponent },
  { path: "signup", component: PageSignupComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {}