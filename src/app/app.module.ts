import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { registerLocaleData } from "@angular/common";
import * as fr from "@angular/common/locales/fr";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ChirpComponent } from "./components/chirp/chirp.component";
import { PageTimelineComponent } from "./components/page-timeline/page-timeline.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { TitleBannerComponent } from "./components/title-banner/title-banner.component";
import { NewChirpComponent } from "./components/new-chirp/new-chirp.component";

import { AutosizeModule } from "ngx-autosize";
import { PageChirpComponent } from "./components/page-chirp/page-chirp.component";
import { FocusedChirpComponent } from "./components/focused-chirp/focused-chirp.component";

@NgModule({
  declarations: [
    AppComponent,
    ChirpComponent,
    PageTimelineComponent,
    NavbarComponent,
    TitleBannerComponent,
    NewChirpComponent,
    PageChirpComponent,
    FocusedChirpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutosizeModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor () {
    registerLocaleData(fr.default);
  }
}
