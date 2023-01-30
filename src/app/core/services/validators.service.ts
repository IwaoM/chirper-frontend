import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { map, Observable } from "rxjs";
import { User } from "../models/user.model";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class ValidatorsService {

  private connectedUser!: User;

  constructor (
    private authService: AuthService
  ) {}

  //* Angular form validators
  uniqueEmailValidator (): AsyncValidatorFn {
    this.connectedUser = this.authService.getConnectedUser();
    return (control: AbstractControl): Observable<null | ValidationErrors> => {
      return this.authService.getEmailUsed(control.value, this.connectedUser.id).pipe(
        map(result => result ? { emailAlreadyInUse: true } : null)
      );
    };
  }

  uniqueHandleValidator (): AsyncValidatorFn {
    this.connectedUser = this.authService.getConnectedUser();
    return (control: AbstractControl): Observable<null | ValidationErrors> => {
      return this.authService.getHandleUsed(control.value, this.connectedUser.id).pipe(
        map(result => result ? { handleAlreadyInUse: true } : null)
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

  differentNewPasswordValidator (oldName: string, newName: string): ValidatorFn {
    return (group: AbstractControl): null | ValidationErrors => {
      const oldPw = group.get(oldName);
      const newPw = group.get(newName);
      return oldPw && newPw && newPw.value !== oldPw.value ? null : { sameAsOldPassword: true };
    };
  }
}
