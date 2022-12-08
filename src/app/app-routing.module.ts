import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageChirpComponent } from './components/page-chirp/page-chirp.component';
import { PageTimelineComponent } from './components/page-timeline/page-timeline.component';

const routes: Routes = [
  { path: "timeline", component: PageTimelineComponent },
  { path: "chirp", component: PageChirpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
