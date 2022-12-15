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

  onContinue (): void {
    this.router.navigateByUrl("app/timeline");
  }

  onLoginButton (): void {
    this.accountService.login();
    console.log(this.loginForm.value);
    this.router.navigateByUrl("app/timeline");
  }

  onSignupButton (): void {
    this.router.navigateByUrl("account/signup");
  }
}
