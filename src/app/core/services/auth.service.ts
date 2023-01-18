import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor (private http: HttpClient) {}

  private token = "";
  private connectedUserUsername = "";
  private connectedUserId = 0;
  private connectedUserThemeBg = 0;
  private connectedUserThemeAccent = 0;

  logout (): void {
    this.token = "";
    this.connectedUserId = 0;
    this.connectedUserUsername = "";
    this.updateThemeBackground(0);
    this.updateThemeAccent(0);
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
  getEmailUsed (email: string, userId: number) {
    return this.http.get<{ email_taken: number }[]>(`https://localhost:3000/api/auth/check-email?email=${email}&userId=${userId}`).pipe(
      map(result => result[0].email_taken)
    );
  }

  getHandleUsed (handle: string, userId: number): Observable<number> {
    return this.http.get<{ handle_taken: number }[]>(`https://localhost:3000/api/auth/check-handle?handle=${handle}&userId=${userId}`).pipe(
      map(result => result[0].handle_taken)
    );
  }

  createAccount (data: FormData): Observable<number> {
    return this.http.post<number>(`https://localhost:3000/api/auth/signup`, data);
  }

  login (data: FormData): Observable<{ user: User, token: string }> {
    return this.http.post<{ user: User, token: string }>(`https://localhost:3000/api/auth/login`, data).pipe(
      tap(result => {
        this.token = result.token;
        this.connectedUserId = result.user.id;
        this.connectedUserUsername = result.user.username;
        this.updateThemeBackground(result.user.theme_bg);
        this.updateThemeAccent(result.user.theme_accent);
      })
    );
  }

  updateThemeBackground (background: number) {
    const rootElem = document.querySelector<HTMLElement>(":root");
    if (rootElem) {
      this.connectedUserThemeBg = background;
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
      this.connectedUserThemeAccent = accent;
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
