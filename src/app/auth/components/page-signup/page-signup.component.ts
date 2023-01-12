import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { tap } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { ValidatorsService } from "src/app/core/services/validators.service";

@Component({
  selector: "app-signup",
  templateUrl: "./page-signup.component.html",
  styleUrls: ["./page-signup.component.scss"]
})
export class PageSignupComponent implements OnInit {
  constructor (
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private validatorsService: ValidatorsService
  ) {}

  signupForm!: FormGroup;
  signupFormData!: FormData;
  profilePicPreview!: string;

  //* Init stuff
  ngOnInit (): void {
    this.initForm();
    this.signupFormData = new FormData();
    this.profilePicPreview = "";
  }

  private initForm (): void {
    this.signupForm = this.formBuilder.group({
      email: new FormControl("", [
        Validators.required,
        Validators.email,
      ], [
        this.validatorsService.uniqueEmailValidator()
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(60)
      ]),
      password2: new FormControl("", [
        Validators.required,
      ]),
      handle: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.pattern("^[a-zA-Z0-9_-]{1,15}$"),
      ], [
        this.validatorsService.uniqueHandleValidator()
      ]),
      username: new FormControl("", [
        Validators.maxLength(40)
      ]),
      bio: new FormControl("", [
        Validators.maxLength(120)
      ]),
    }, {
      validators: [this.validatorsService.samePasswordValidator("password", "password2")],
      updateOn: "blur"
    });
  }

  //* Event handlers
  onSignupButton (): void {
    for (const field in this.signupForm.value) {
      this.signupFormData.append(field, this.signupForm.value[field]);
    }
    this.authService.createAccount(this.signupFormData).pipe(
      tap(() => this.router.navigateByUrl("auth/login"))
    ).subscribe();

    this.signupFormData.delete("email");
    this.signupFormData.delete("password");
    this.signupFormData.delete("password2");
    this.signupFormData.delete("handle");
    this.signupFormData.delete("username");
    this.signupFormData.delete("bio");
  }

  onCancelButton (): void {
    this.router.navigateByUrl("auth/login");
  }

  onProfilePicSelect (event: any): void {
    if (event?.target?.files[0]) {
      const file: File = event.target.files[0];

      // add picture to formData
      if (this.signupFormData.has("profilePic")) {
        this.signupFormData.delete("profilePic");
      }
      this.signupFormData.append("profilePic", file, "profilePic.png");

      // update the src for the preview image
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onProfilePicRemove (): void {
    this.profilePicPreview = "";
    this.signupFormData.delete("profilePic");
  }

  //* Form error messages
  getFormControlErrorText (ctrl: AbstractControl | null): string {
    if (ctrl?.hasError("required")) {
      return "Ce champ est requis";
    } else if (ctrl?.hasError("minlength")) {
      return "La valeur rentrée n'est pas assez longue";
    } else if (ctrl?.hasError("maxlength")) {
      return "La valeur rentrée est trop longue";
    } else if (ctrl?.hasError("email")) {
      return "La valeur rentrée n'est pas une adresse mail valide";
    } else if (ctrl?.hasError("pattern")) {
      return "La valeur rentrée contient des caractères invalides";
    } else if (ctrl?.hasError("emailAlreadyInUse")) {
      return "Cette adresse email est déjà utilisée";
    } else if (ctrl?.hasError("handleAlreadyInUse")) {
      return "Ce nom d'utilisateur est déjà utilisé";
    } else if (ctrl?.hasError("passwordsMismatch")) {
      return "Les mots de passe ne correspondent pas";
    } else {
      return "";
    }
  }
}
