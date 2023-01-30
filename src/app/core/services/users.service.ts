import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { map, Observable, of, tap } from "rxjs";
import { Chirp } from "../models/chirp.model";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root"
})
export class UsersService {

  userProfilePics!: Map<number, { cachedTime: Date, url: SafeUrl }>;

  constructor (
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.userProfilePics = new Map<number, { cachedTime: Date, url: SafeUrl }>;
  }

  // GET requests
  getUserById (userId: number): Observable<User> {
    return this.http.get<User>(`https://localhost:3000/api/users/${userId}`);
  }

  getUserProfilePic (userId: number, picUpdated: Date): Observable<SafeUrl> {
    if (typeof picUpdated === "string") {
      picUpdated = new Date(picUpdated);
    }
    const cachedUrl = this.userProfilePics.get(userId);
    if (cachedUrl && picUpdated < cachedUrl.cachedTime) {
      return of(cachedUrl.url);
    }
    return this.http.get(`https://localhost:3000/api/users/${userId}/picture`, { responseType: "blob" }).pipe(
      map(blob => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob))),
      tap(picUrl => this.userProfilePics.set(userId, { cachedTime: new Date(), url: picUrl }))
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

  searchUsers (searchText: string): Observable<User[]> {
    return this.http.get<User[]>("https://localhost:3000/api/users/search", { params: { searchText } });
  }

  // POST requests
  updateProfile (userId: number, data: FormData): Observable<number> {
    return this.http.post<number>(`https://localhost:3000/api/users/${userId}/profile`, data);
  }

  updatePassword (userId: number, data: FormData): Observable<number> {
    return this.http.post<number>(`https://localhost:3000/api/users/${userId}/password`, data);
  }

  updateThemeBg (userId: number, value: number): Observable<number> {
    return this.http.post<number>(`https://localhost:3000/api/users/${userId}/theme-bg`, { value });
  }

  updateThemeAccent (userId: number, value: number): Observable<number> {
    return this.http.post<number>(`https://localhost:3000/api/users/${userId}/theme-accent`, { value });
  }

  // DELETE requests
  deleteUser (userId: number): Observable<number> {
    return this.http.delete<number>(`https://localhost:3000/api/users/${userId}`);
  }
}
