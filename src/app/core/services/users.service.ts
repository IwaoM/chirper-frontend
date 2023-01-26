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
    console.log(`calling getUserById(${userId})`);
    return this.http.get<User>(`https://localhost:3000/api/users/${userId}`);
  }

  getUserProfilePic (userId: number): Observable<SafeUrl> {
    console.log(`calling getUserProfilePic(${userId})`);
    return this.http.get(`https://localhost:3000/api/users/${userId}/picture`, { responseType: "blob" }).pipe(
      map(blob => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)))
    );
  }

  getUserChirps (userId: number): Observable<Chirp[]> {
    console.log(`calling getUserChirps(${userId})`);
    return this.http.get<Chirp[]>(`https://localhost:3000/api/users/${userId}/chirps`);
  }

  getUserStars (userId: number): Observable<Chirp[]> {
    console.log(`calling getUserStars(${userId})`);
    return this.http.get<Chirp[]>(`https://localhost:3000/api/users/${userId}/stars`);
  }

  getUserStarIds (userId: number): Observable<number[]> {
    console.log(`calling getUserStarIds(${userId})`);
    return this.http.get<number[]>(`https://localhost:3000/api/users/${userId}/star-ids`);
  }

  searchUsers (searchText: string): Observable<User[]> {
    console.log(`calling searchUsers(${searchText})`);
    return this.http.get<User[]>("https://localhost:3000/api/users/search", { params: { searchText } });
  }

  // POST requests
  updateProfile (userId: number, data: FormData): Observable<number> {
    console.log(`calling updateProfile(${userId}) with the following FormData:`);
    console.log(data);
    return this.http.post<number>(`https://localhost:3000/api/users/${userId}/profile`, data);
  }

  updatePassword (userId: number, data: FormData): Observable<number> {
    console.log(`calling updatePassword(${userId}) with the following FormData:`);
    console.log(data);
    return this.http.post<number>(`https://localhost:3000/api/users/${userId}/password`, data);
  }

  updateThemeBg (userId: number, value: number): Observable<number> {
    console.log(`calling updateThemeBg(${userId}, ${value})`);
    return this.http.post<number>(`https://localhost:3000/api/users/${userId}/theme-bg`, { value });
  }

  updateThemeAccent (userId: number, value: number): Observable<number> {
    console.log(`calling updateThemeAccent(${userId}, ${value})`);
    return this.http.post<number>(`https://localhost:3000/api/users/${userId}/theme-accent`, { value });
  }

  // DELETE requests
  deleteUser (userId: number): Observable<number> {
    console.log(`calling deleteUser(${userId})`);
    return this.http.delete<number>(`https://localhost:3000/api/users/${userId}`);
  }
}
