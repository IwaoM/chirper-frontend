import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChirpComponent } from './chirp/chirp.component';
import { PageTimelineComponent } from './page-timeline/page-timeline.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TitleBannerComponent } from './title-banner/title-banner.component';
import { NewChirpComponent } from './new-chirp/new-chirp.component';

import {AutosizeModule} from 'ngx-autosize';
import { PageChirpComponent } from './page-chirp/page-chirp.component';
import { FocusedChirpComponent } from './focused-chirp/focused-chirp.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
