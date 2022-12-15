import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AccountInterceptor } from "./account.interceptor";

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AccountInterceptor, multi: true }
];