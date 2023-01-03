import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { tap } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./page-login.component.html",
  styleUrls: ["./page-login.component.scss"]
})
export class PageLoginComponent implements OnInit {
  constructor (
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  loginForm!: FormGroup;
  loginFormData!: FormData;

  ngOnInit (): void {
    this.loginForm = this.formBuilder.group({
      email: [null],
      password: [null],
    });
    this.loginFormData = new FormData();
  }

  onLoginButton (): void {
    for (const field in this.loginForm.value) {
      this.loginFormData.append(field, this.loginForm.value[field]);
    }
    this.authService.login(this.loginFormData).pipe(
      tap(() => this.router.navigateByUrl("app/timeline"))
    ).subscribe();

    this.loginFormData.delete("email");
    this.loginFormData.delete("password");
  }

  onSignupButton (): void {
    this.router.navigateByUrl("auth/signup");
  }
}
