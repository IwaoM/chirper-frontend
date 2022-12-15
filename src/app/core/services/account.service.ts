import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AccountService {

  private token!: string;

  login (): void {
    this.token = "fakeToken";
  }

  logout (): void {
    this.token = "";
  }

  getToken (): string {
    return this.token;
  }
}
