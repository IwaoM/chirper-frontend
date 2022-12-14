import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PageProfileComponent } from "./components/page-profile/page-profile.component";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { UsersRoutingModule } from "./users-routing.module";
import { UserCardComponent } from './components/user-card/user-card.component';

@NgModule({
  declarations: [
    PageProfileComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
