import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AccountService } from "../services/account.service";

@Injectable()
export class AccountInterceptor implements HttpInterceptor {
  constructor (private accountService: AccountService) {}

  intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers = new HttpHeaders().append("Authorization", `Bearer ${this.accountService.getToken()}`);
    const modifiedReq = request.clone({ headers });
    return next.handle(modifiedReq);
  }
}
