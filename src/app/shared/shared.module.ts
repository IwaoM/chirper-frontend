import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { TitleBannerComponent } from "./components/title-banner/title-banner.component";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "./components/footer/footer.component";



@NgModule({
  declarations: [
    NavbarComponent,
    TitleBannerComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    TitleBannerComponent,
    FooterComponent
  ]
})
export class SharedModule { }
