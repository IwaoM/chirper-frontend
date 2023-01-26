import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor (
    private http: HttpClient,
    private router: Router
  ) {}

  private token = "";
  private connectedUser = new User();

  logout (confirm?: string): void {
    this.token = "";
    this.connectedUser = new User();
    this.updateThemeBackground(0);
    this.updateThemeAccent(0);
    if (confirm) {
      this.router.navigateByUrl(`auth/login?confirm=${confirm}`);
    } else {
      this.router.navigateByUrl(`auth/login`);
    }
  }

  getToken (): string {
    return this.token;
  }

  getConnectedUser (): User {
    return this.connectedUser;
  }

  //* API requests
  getEmailUsed (email: string, userId: number) {
    console.log(`calling getEmailUsed(${email}, ${userId})`);
    return this.http.get<{ email_taken: number }[]>(`https://localhost:3000/api/auth/check-email?email=${email}&userId=${userId}`).pipe(
      map(result => result[0].email_taken)
    );
  }

  getHandleUsed (handle: string, userId: number): Observable<number> {
    console.log(`calling getHandleUsed(${handle}, ${userId})`);
    return this.http.get<{ handle_taken: number }[]>(`https://localhost:3000/api/auth/check-handle?handle=${handle}&userId=${userId}`).pipe(
      map(result => result[0].handle_taken)
    );
  }

  createAccount (data: FormData): Observable<number> {
    console.log(`calling createAccount() with the following FormData:`);
    console.log(data);
    return this.http.post<number>(`https://localhost:3000/api/auth/signup`, data);
  }

  login (data: FormData): Observable<{ user: User, token: string }> {
    console.log(`calling login() with the following FormData:`);
    console.log(data);
    return this.http.post<{ user: User, token: string }>(`https://localhost:3000/api/auth/login`, data).pipe(
      tap(result => {
        this.token = result.token;
        this.connectedUser = result.user;
        this.updateThemeBackground(result.user.theme_bg);
        this.updateThemeAccent(result.user.theme_accent);
      })
    );
  }

  refreshConnectedUser (): Observable<User> {
    console.log(`calling refreshConnectedUser()`);
    return this.http.get<User>(`https://localhost:3000/api/users/${this.connectedUser.id}`).pipe(
      tap(user => this.connectedUser = user)
    );
  }

  updateThemeBackground (background: number) {
    const rootElem = document.querySelector<HTMLElement>(":root");
    if (rootElem) {
      if (background == 0) {
        // dark
        rootElem.style.setProperty("--theme-bg", "#0F1311");
        rootElem.style.setProperty("--theme-bg-transparent", "rgba(15, 19, 17, 0.6)");
        rootElem.style.setProperty("--theme-bg-hover", "#1D211F");
        rootElem.style.setProperty("--theme-bg-select", "#2C302E");
        rootElem.style.setProperty("--theme-text", "#FFFFFF");
        rootElem.style.setProperty("--theme-text-light", "#A5A7A6");
        rootElem.style.setProperty("--theme-border", "#5A5D5B");
      } else if (background == 1) {
        // light
        rootElem.style.setProperty("--theme-bg", "#FFFFFF");
        rootElem.style.setProperty("--theme-bg-transparent", "rgba(255, 255, 255, 0.6)");
        rootElem.style.setProperty("--theme-bg-hover", "#F0F1F1");
        rootElem.style.setProperty("--theme-bg-select", "#E1E2E2");
        rootElem.style.setProperty("--theme-text", "#0F1311");
        rootElem.style.setProperty("--theme-text-light", "#686B6A");
        rootElem.style.setProperty("--theme-border", "#B4B5B4");
      }
    }
  }

  updateThemeAccent (accent: number) {
    const rootElem = document.querySelector<HTMLElement>(":root");
    if (rootElem) {
      if (accent == 0) {
        // mint
        rootElem.style.setProperty("--theme-accent", "#00DF77");
        rootElem.style.setProperty("--theme-accent-hover", "#00D270");
        rootElem.style.setProperty("--theme-accent-variant", "#00DFB0");
      } else if (accent == 1) {
        // fuschia
        rootElem.style.setProperty("--theme-accent", "#DF0067");
        rootElem.style.setProperty("--theme-accent-hover", "#D20061");
        rootElem.style.setProperty("--theme-accent-variant", "#DF009F");
      } else if (accent == 2) {
        // orange
        rootElem.style.setProperty("--theme-accent", "#DF3F00");
        rootElem.style.setProperty("--theme-accent-hover", "#D23B00");
        rootElem.style.setProperty("--theme-accent-variant", "#DF7F00");
      } else if (accent == 3) {
        // lime
        rootElem.style.setProperty("--theme-accent", "#68DF00");
        rootElem.style.setProperty("--theme-accent-hover", "#62D200");
        rootElem.style.setProperty("--theme-accent-variant", "#A0DF00");
      }
    }
  }
}
