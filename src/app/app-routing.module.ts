import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "app", loadChildren: () => import("./chirps/chirps.module").then(m => m.ChirpsModule) },
  { path: "account", loadChildren: () => import("./account/account.module").then(m => m.AccountModule) },
  { path: "**", redirectTo: "app/timeline" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
