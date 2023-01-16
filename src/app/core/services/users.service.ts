import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { map, Observable } from "rxjs";
import { Chirp } from "../models/chirp.model";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root"
})
export class UsersService {

  constructor (
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  // GET requests
  getUserById (userId: number): Observable<User> {
    return this.http.get<User>(`https://localhost:3000/api/users/${userId}`);
  }

  getUserProfilePic (authorId: number): Observable<SafeUrl> {
    return this.http.get(`https://localhost:3000/api/users/${authorId}/picture`, { responseType: "blob" }).pipe(
      map(blob => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)))
    );
  }

  getUserChirps (userId: number): Observable<Chirp[]> {
    return this.http.get<Chirp[]>(`https://localhost:3000/api/users/${userId}/chirps`);
  }

  getUserStars (userId: number): Observable<Chirp[]> {
    return this.http.get<Chirp[]>(`https://localhost:3000/api/users/${userId}/stars`);
  }

  getUserStarIds (userId: number): Observable<number[]> {
    return this.http.get<number[]>(`https://localhost:3000/api/users/${userId}/star-ids`);
  }

  // POST requests
  updateProfile (userId: number, data: FormData): Observable<number> {
    return this.http.post<number>(`https://localhost:3000/api/users/${userId}/update-profile`, data);
  }

  updatePassword (userId: number, data: FormData): Observable<number> {
    return this.http.post<number>(`https://localhost:3000/api/users/${userId}/update-password`, data);
  }
}
