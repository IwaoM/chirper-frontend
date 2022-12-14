import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor (private http: HttpClient) {}

  private token = "";
  private connectedUserUsername = "";
  private connectedUserId = 0;

  login (data: FormData): Observable<{ userId: number, username: string, token: string }> {
    return this.http.post<{ userId: number, username: string, token: string }>(`https://localhost:3000/api/auth/login`, data).pipe(
      tap(result => {
        this.token = result.token;
        this.connectedUserId = result.userId;
        this.connectedUserUsername = result.username;
      })
    );
  }

  logout (): void {
    this.token = "";
    this.connectedUserId = 0;
    this.connectedUserUsername = "";
  }

  getToken (): string {
    return this.token;
  }

  getConnectedUserId (): number {
    return this.connectedUserId;
  }

  getConnectedUserUsername (): string {
    return this.connectedUserUsername;
  }

  //* API requests
  getEmailUsed (email: string): Observable<number> {
    return this.http.get<{ email_taken: number }[]>(`https://localhost:3000/api/auth/count-email?email=${email}`).pipe(
      map(result => result[0].email_taken)
    );
  }

  getHandleUsed (handle: string): Observable<number> {
    return this.http.get<{ handle_taken: number }[]>(`https://localhost:3000/api/auth/count-handle?handle=${handle}`).pipe(
      map(result => result[0].handle_taken)
    );
  }

  createAccount (data: FormData): Observable<number> {
    return this.http.post<number>(`https://localhost:3000/api/auth/signup`, data);
  }
}
