import { LOCALE_ID, NgModule } from "@angular/core";
import * as fr from "@angular/common/locales/fr";
import { CommonModule, registerLocaleData } from "@angular/common";
import { SharedModule } from "../shared/shared.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" }
  ],
})
export class CoreModule {
  constructor () {
    registerLocaleData(fr.default);
  }
}
