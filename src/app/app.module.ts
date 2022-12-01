import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChirpComponent } from './chirp/chirp.component';
import { TimelineComponent } from './timeline/timeline.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TitleBannerComponent } from './title-banner/title-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    ChirpComponent,
    TimelineComponent,
    NavbarComponent,
    TitleBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
