import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { map, Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class ValidatorsService {

  constructor (
    private authService: AuthService
  ) {}

  //* Angular form validators
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
}
