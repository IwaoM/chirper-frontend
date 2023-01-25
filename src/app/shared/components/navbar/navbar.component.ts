import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/core/models/user.model";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  constructor (
    private router: Router,
    private authService: AuthService,
  ) {}

  @Input() currentPage!: string;

  connectedUser!: User;

  ngOnInit () {
    this.connectedUser = this.authService.getConnectedUser();
  }

  onLogoutButton (): void {
    this.authService.logout();
  }
}
