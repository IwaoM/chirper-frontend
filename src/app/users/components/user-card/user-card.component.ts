import { Component, Input, OnInit } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { User } from "src/app/core/models/user.model";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-user-card",
  templateUrl: "./user-card.component.html",
  styleUrls: ["./user-card.component.scss"]
})
export class UserCardComponent implements OnInit {
  constructor (
    private authService: AuthService,
  ) {}

  @Input() user!: User;
  @Input() profilePicUrl!: SafeUrl | null;

  connectedUser!: { id: number };

  ngOnInit () {
    this.connectedUser = { id: this.authService.getConnectedUserId() };
  }
}
