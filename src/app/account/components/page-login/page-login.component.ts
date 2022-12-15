import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AccountService } from "src/app/core/services/account.service";

@Component({
  selector: "app-login",
  templateUrl: "./page-login.component.html",
  styleUrls: ["./page-login.component.scss"]
})
export class PageLoginComponent implements OnInit {
  constructor (
    private router: Router,
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {}

  loginForm!: FormGroup;

  ngOnInit (): void {
    this.loginForm = this.formBuilder.group({
      email: [null],
      password: [null],
    });
  }

  onLoginButton (): void {
    this.accountService.login();
    this.router.navigateByUrl("app/timeline");
  }

  onSignupButton (): void {
    this.router.navigateByUrl("account/signup");
  }
}
