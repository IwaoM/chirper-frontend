import { Component, OnInit } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./page-signup.component.html",
  styleUrls: ["./page-signup.component.scss"]
})
export class PageSignupComponent implements OnInit {
  constructor (
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
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
        this.uniqueEmailValidator()
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
        this.uniqueHandleValidator()
      ]),
      username: new FormControl("", [
        Validators.maxLength(40)
      ]),
      bio: new FormControl("", [
        Validators.maxLength(160)
      ]),
    }, {
      validators: [this.samePasswordValidator("password", "password2")],
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

  //* Validators
  uniqueEmailValidator (): AsyncValidatorFn {
    return (control: AbstractControl): Observable<null | ValidationErrors> => {
      return this.authService.getEmailUsed(control.value).pipe(
        map(result => result ? { emailAlreadyInUse: true } : null)
      );
    };
  }

  samePasswordValidator (mainName: string, confirmName: string): ValidatorFn {
    return (group: AbstractControl): null | ValidationErrors => {
      const main = group.get(mainName);
      const confirm = group.get(confirmName);
      return main && confirm && confirm.value === main.value ? null : { passwordsMismatch: true };
    };
  }

  uniqueHandleValidator (): AsyncValidatorFn {
    return (control: AbstractControl): Observable<null | ValidationErrors> => {
      return this.authService.getHandleUsed(control.value).pipe(
        map(result => result ? { handleAlreadyInUse: true } : null)
      );
    };
  }

  //* Error messages
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
