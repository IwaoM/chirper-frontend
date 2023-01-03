import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PageChirpComponent } from "./components/page-chirp/page-chirp.component";
import { PageTimelineComponent } from "./components/page-timeline/page-timeline.component";

import { AuthGuard } from "../core/guards/auth.guard";

const routes: Routes = [
  { path: "timeline", component: PageTimelineComponent, canActivate: [AuthGuard] },
  { path: "chirps/:id", component: PageChirpComponent, canActivate: [AuthGuard] },
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