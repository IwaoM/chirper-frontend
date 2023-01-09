import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AutosizeModule } from "ngx-autosize";

import { NewChirpComponent } from "./components/new-chirp/new-chirp.component";
import { PageChirpComponent } from "./components/page-chirp/page-chirp.component";
import { PageTimelineComponent } from "./components/page-timeline/page-timeline.component";
import { ChirpsRoutingModule } from "./chirps-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    NewChirpComponent,
    PageChirpComponent,
    PageTimelineComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChirpsRoutingModule,
    AutosizeModule,
    ReactiveFormsModule
  ]
})
export class ChirpsModule { }
