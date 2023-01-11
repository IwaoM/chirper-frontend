import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { map, Observable } from "rxjs";
import { Chirp } from "../models/chirp.model";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
  providedIn: "root"
})
export class ChirpsService {
  ppFolder = "../../assets/userPictures";

  constructor (
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  // GET requests
  getAllChirps (): Observable<Chirp[]> {
    return this.http.get<Chirp[]>("https://localhost:3000/api/chirps");
  }

  getRepliesTo (chirpId: number): Observable<Chirp[]> {
    return this.http.get<Chirp[]>(`https://localhost:3000/api/chirps/${chirpId}/replies`);
  }

  getChirpById (chirpId: number): Observable<Chirp> {
    return this.http.get<Chirp[]>(`https://localhost:3000/api/chirps/${chirpId}`).pipe(
      map(entries => entries[0])
    );
  }

  getChirpImage (chirpId: number): Observable<SafeUrl> {
    return this.http.get(`https://localhost:3000/api/chirps/${chirpId}/image`, { responseType: "blob" }).pipe(
      map(blob => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)))
    );
  }

  // POST / DELETE requests
  createChirp (data: FormData): Observable<number> {
    return this.http.post<number>(`https://localhost:3000/api/chirps`, data);
  }

  starChirpById (chirpId: number, userId: number, starred: boolean): Observable<boolean> {
    return this.http.post<boolean>(`https://localhost:3000/api/chirps/${chirpId}/stars/${userId}`, { starred });
  }

  deleteChirp (chirpId: number): Observable<number> {
    return this.http.delete<number>(`https://localhost:3000/api/chirps/${chirpId}`);
  }

}
