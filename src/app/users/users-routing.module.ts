import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PageProfileComponent } from "./components/page-profile/page-profile.component";
import { PageSettingsComponent } from "./components/page-settings/page-settings.component";

import { AuthGuard } from "../core/guards/auth.guard";

const routes: Routes = [
  { path: ":id/settings", component: PageSettingsComponent, canActivate: [AuthGuard] },
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