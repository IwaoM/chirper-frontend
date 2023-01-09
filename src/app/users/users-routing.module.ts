import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PageProfileComponent } from "./components/page-profile/page-profile.component";

import { AuthGuard } from "../core/guards/auth.guard";

const routes: Routes = [
  { path: ":id", component: PageProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule {}