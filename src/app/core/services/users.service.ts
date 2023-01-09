import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { map, Observable } from "rxjs";
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
    return this.http.get<User[]>(`https://localhost:3000/api/users/${userId}`).pipe(
      map(entries => entries[0])
    );
  }

  getUserProfilePic (authorId: number): Observable<SafeUrl> {
    return this.http.get(`https://localhost:3000/api/users/${authorId}/picture`, { responseType: "blob" }).pipe(
      map(blob => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)))
    );
  }
}
