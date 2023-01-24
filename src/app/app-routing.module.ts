import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "app", loadChildren: () => import("./chirps/chirps.module").then(m => m.ChirpsModule) },
  { path: "users", loadChildren: () => import("./users/users.module").then(m => m.UsersModule) },
  { path: "search", loadChildren: () => import("./search/search.module").then(m => m.SearchModule) },
  { path: "auth", loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule) },
  // { path: "**", redirectTo: "app/timeline" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
