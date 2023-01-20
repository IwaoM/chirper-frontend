import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { User } from "src/app/core/models/user.model";
import { AuthService } from "src/app/core/services/auth.service";
import { UsersService } from "src/app/core/services/users.service";
import { ValidatorsService } from "src/app/core/services/validators.service";

@Component({
  selector: "app-account-delete-form",
  templateUrl: "./account-delete-form.component.html",
  styleUrls: ["./account-delete-form.component.scss"]
})
export class AccountDeleteFormComponent implements OnInit {
  constructor (
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    private validatorsService: ValidatorsService
  ) {}

  connectedUser!: { id: number };
  displayConfirm!: boolean;

  user$!: Observable<User>;

  ngOnInit () {
    this.initPage();
    this.displayConfirm = false;
  }

  initPage () {
    this.connectedUser = { id: this.authService.getConnectedUserId() };
  }

  onDeleteButton () {
    this.displayConfirm = true;
  }

  onCancelButton () {
    this.displayConfirm = false;
  }

  onConfirmButton () {
    this.displayConfirm = false;
    this.usersService.deleteUser(this.connectedUser.id).subscribe();
    this.authService.logout();
  }
}
