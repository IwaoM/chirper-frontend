import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NavbarComponent } from "./components/navbar/navbar.component";
import { TitleBannerComponent } from "./components/title-banner/title-banner.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ChirpComponent } from "./components/chirp/chirp.component";
import { SectionTabsComponent } from "./components/section-tabs/section-tabs.component";
import { UserCardComponent } from "./components/user-card/user-card.component";



@NgModule({
  declarations: [
    NavbarComponent,
    TitleBannerComponent,
    FooterComponent,
    ChirpComponent,
    UserCardComponent,
    SectionTabsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    TitleBannerComponent,
    FooterComponent,
    ChirpComponent,
    UserCardComponent,
    SectionTabsComponent
  ]
})
export class SharedModule { }
