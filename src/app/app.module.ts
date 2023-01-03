import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { AuthModule } from "./auth/auth.module";
import { ChirpsModule } from "./chirps/chirps.module";
import { SharedModule } from "./shared/shared.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    CoreModule,
    SharedModule,
    ChirpsModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
