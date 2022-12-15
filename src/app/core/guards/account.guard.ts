import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AccountService } from "../services/account.service";

@Injectable({
  providedIn: "root"
})
export class AccountGuard implements CanActivate {
  constructor (private accountService: AccountService, private router: Router) {}

  canActivate (): boolean {
    const token = this.accountService.getToken();
    if (token) {
      return true;
    } else {
      this.router.navigateByUrl("account/login");
      return false;
    }
  }
}
