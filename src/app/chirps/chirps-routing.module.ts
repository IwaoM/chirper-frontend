import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PageChirpComponent } from "./components/page-chirp/page-chirp.component";
import { PageTimelineComponent } from "./components/page-timeline/page-timeline.component";

import { AccountGuard } from "../core/guards/account.guard";

const routes: Routes = [
  { path: "timeline", component: PageTimelineComponent, canActivate: [AccountGuard] },
  { path: "chirps/:id", component: PageChirpComponent, canActivate: [AccountGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ChirpsRoutingModule {}