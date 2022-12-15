import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AccountService } from "src/app/core/services/account.service";

@Component({
  selector: "app-signup",
  templateUrl: "./page-signup.component.html",
  styleUrls: ["./page-signup.component.scss"]
})
export class PageSignupComponent implements OnInit {
  constructor (
    private router: Router,
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {}

  signupForm!: FormGroup;

  ngOnInit (): void {
    this.signupForm = this.formBuilder.group({
      email: [null],
      password: [null],
      password2: [null],
      handle: [null],
      username: [null],
      bio: [null],
    });
  }

  onSignupButton (): void {
    // todo: create account
    this.accountService.login();
    this.router.navigateByUrl("app/timeline");
  }

  onCancelButton (): void {
    this.router.navigateByUrl("account/login");
  }
}
