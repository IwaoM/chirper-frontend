import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./page-login.component.html",
  styleUrls: ["./page-login.component.scss"]
})
export class PageLoginComponent implements OnInit {
  constructor (private router: Router, private formBuilder: FormBuilder) {}

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
    console.log(this.loginForm.value);
  }

  onSignupButton (): void {
    this.router.navigateByUrl("account/signup");
  }
}
