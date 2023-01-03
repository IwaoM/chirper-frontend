import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  constructor (private http: HttpClient) {}

  private token!: string;

  login (data: FormData): Observable<{ userId: number, token: string }> {
    return this.http.post<{ userId: number, token: string }>(`https://localhost:3000/api/users/login`, data).pipe(
      tap(result => this.token = result.token)
    );
  }

  logout (): void {
    this.token = "";
  }

  getToken (): string {
    return this.token;
  }

  //* API requests
  getEmailUsed (email: string): Observable<number> {
    return this.http.get<{ email_taken: number }[]>(`https://localhost:3000/api/users/search-email?email=${email}`).pipe(
      map(result => result[0].email_taken)
    );
  }

  getHandleUsed (handle: string): Observable<number> {
    return this.http.get<{ handle_taken: number }[]>(`https://localhost:3000/api/users/search-handle?handle=${handle}`).pipe(
      map(result => result[0].handle_taken)
    );
  }

  createAccount (data: FormData): Observable<number> {
    return this.http.post<number>(`https://localhost:3000/api/users/signup`, data);
  }
}
