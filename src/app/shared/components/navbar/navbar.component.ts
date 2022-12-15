import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "src/app/core/services/account.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
  constructor (private router: Router, private accountService: AccountService) {}

  @Input() currentPage!: string;

  onLogoutButton (): void {
    this.accountService.logout();
    this.router.navigateByUrl("account/login");
  }
}
