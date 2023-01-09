import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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

  connectedUser!: { id: number };

  ngOnInit () {
    this.connectedUser = { id: this.authService.getConnectedUserId() };
  }

  onLogoutButton (): void {
    this.authService.logout();
    this.router.navigateByUrl("auth/login");
  }
}
