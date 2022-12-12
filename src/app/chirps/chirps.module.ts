import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AutosizeModule } from "ngx-autosize";

import { ChirpComponent } from "./components/chirp/chirp.component";
import { NewChirpComponent } from "./components/new-chirp/new-chirp.component";
import { PageChirpComponent } from "./components/page-chirp/page-chirp.component";
import { PageTimelineComponent } from "./components/page-timeline/page-timeline.component";
import { ChirpsRoutingModule } from "./chirps-routing.module";
import { SharedModule } from "../shared/shared.module";



@NgModule({
  declarations: [
    ChirpComponent,
    NewChirpComponent,
    PageChirpComponent,
    PageTimelineComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChirpsRoutingModule,
    AutosizeModule
  ]
})
export class ChirpsModule { }
