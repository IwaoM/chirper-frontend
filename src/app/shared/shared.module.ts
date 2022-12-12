import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { TitleBannerComponent } from "./components/title-banner/title-banner.component";
import { RouterModule } from "@angular/router";



@NgModule({
  declarations: [
    NavbarComponent,
    TitleBannerComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    TitleBannerComponent
  ]
})
export class SharedModule { }
