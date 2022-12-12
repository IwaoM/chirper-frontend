import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PageChirpComponent } from "./components/page-chirp/page-chirp.component";
import { PageTimelineComponent } from "./components/page-timeline/page-timeline.component";

const routes: Routes = [
  { path: "timeline", component: PageTimelineComponent },
  { path: "chirps/:id", component: PageChirpComponent },
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