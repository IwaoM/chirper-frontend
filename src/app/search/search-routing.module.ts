import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PageSearchComponent } from "./components/page-search/page-search.component";

import { AuthGuard } from "../core/guards/auth.guard";

const routes: Routes = [
  { path: "**", component: PageSearchComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SearchRoutingModule {}