import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PageSearchComponent } from "./components/page-search/page-search.component";
import { SharedModule } from "../shared/shared.module";
import { SearchRoutingModule } from "./search-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { SearchFormComponent } from "./components/search-form/search-form.component";



@NgModule({
  declarations: [
    PageSearchComponent,
    SearchFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
