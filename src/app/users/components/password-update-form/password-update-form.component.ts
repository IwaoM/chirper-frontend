import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { tap } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { UsersService } from "src/app/core/services/users.service";
import { ValidatorsService } from "src/app/core/services/validators.service";

@Component({
  selector: "app-password-update-form",
  templateUrl: "./password-update-form.component.html",
  styleUrls: ["./password-update-form.component.scss"]
})
export class PasswordUpdateFormComponent implements OnInit {

  constructor (
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    private validatorsService: ValidatorsService,
  ) {}

  connectedUser!: { id: number };

  passwordForm!: FormGroup;
  passwordFormData!: FormData;

  passwordUpdateResult = 0;
  errorMessage = "";

  ngOnInit () {
    this.initPage();
  }

  initPage () {
    this.connectedUser = { id: this.authService.getConnectedUserId() };
    this.initForm();
  }

  private initForm (): void {
    this.passwordFormData = new FormData();

    this.passwordForm = this.formBuilder.group({
      oldPassword: new FormControl("", [
        Validators.required,
      ]),
      newPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(60)
      ]),
      newPassword2: new FormControl("", [
        Validators.required,
      ]),
    }, {
      validators: [
        this.validatorsService.differentNewPasswordValidator("oldPassword", "newPassword"),
        this.validatorsService.samePasswordValidator("newPassword", "newPassword2")
      ],
    });
  }

  onUpdateButton () {
    for (const field in this.passwordForm.value) {
      this.passwordFormData.append(field, this.passwordForm.value[field]);
    }
    this.usersService.updatePassword(this.connectedUser.id, this.passwordFormData).pipe(
      tap(() => this.initPage())
    ).subscribe({
      next: (result) => {
        this.passwordUpdateResult = result;
        this.errorMessage = "";
      },
      error: (err) => {
        this.passwordUpdateResult = 0;
        if (err.error.message === "Incorrect password") {
          this.errorMessage = "Le mot de passe actuel entré est incorrect";
        }
      }
    });

    this.passwordFormData.delete("oldPassword");
    this.passwordFormData.delete("newPassword");
    this.passwordFormData.delete("newPassword2");
  }

  getFormControlErrorText (ctrl: AbstractControl | null): string {
    if (ctrl?.hasError("required")) {
      return "Ce champ est requis";
    } else if (ctrl?.hasError("minlength")) {
      return "La valeur rentrée n'est pas assez longue";
    } else if (ctrl?.hasError("maxlength")) {
      return "La valeur rentrée est trop longue";
    } else if (ctrl?.hasError("sameAsOldPassword")) {
      return "Le nouveau mot de passe doit être différent de l'ancien";
    } else if (ctrl?.hasError("passwordsMismatch")) {
      return "Les mots de passe ne correspondent pas";
    } else {
      return "";
    }
  }

}
