import { Component, OnInit } from "@angular/core";
import { User } from "src/app/core/models/user.model";
import { AuthService } from "src/app/core/services/auth.service";
import { UsersService } from "src/app/core/services/users.service";

@Component({
  selector: "app-account-delete-form",
  templateUrl: "./account-delete-form.component.html",
  styleUrls: ["./account-delete-form.component.scss"]
})
export class AccountDeleteFormComponent implements OnInit {
  constructor (
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  connectedUser!: User;
  displayConfirm!: boolean;

  ngOnInit () {
    this.initPage();
    this.displayConfirm = false;
  }

  initPage () {
    this.connectedUser = this.authService.getConnectedUser();
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
    this.authService.logout("delete");
  }
}
