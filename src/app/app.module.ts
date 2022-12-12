import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { registerLocaleData } from "@angular/common";
import * as fr from "@angular/common/locales/fr";
import { HttpClientModule } from "@angular/common/http";
import { AutosizeModule } from "ngx-autosize";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { PageChirpComponent } from "./components/page-chirp/page-chirp.component";
import { ChirpComponent } from "./components/chirp/chirp.component";
import { PageTimelineComponent } from "./components/page-timeline/page-timeline.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { TitleBannerComponent } from "./components/title-banner/title-banner.component";
import { NewChirpComponent } from "./components/new-chirp/new-chirp.component";


@NgModule({
  declarations: [
    AppComponent,
    ChirpComponent,
    PageTimelineComponent,
    NavbarComponent,
    TitleBannerComponent,
    NewChirpComponent,
    PageChirpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutosizeModule,
    HttpClientModule
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
