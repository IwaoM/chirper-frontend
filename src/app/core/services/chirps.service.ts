import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { map, Observable, of, tap } from "rxjs";
import { Chirp } from "../models/chirp.model";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
  providedIn: "root"
})
export class ChirpsService {
  ppFolder = "../../assets/userPictures";
  chirpImages!: Map<number, SafeUrl>;

  constructor (
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.chirpImages = new Map<number, SafeUrl>;
  }

  // GET requests
  getAllChirps (): Observable<Chirp[]> {
    return this.http.get<Chirp[]>("https://localhost:3000/api/chirps");
  }

  getChirpById (chirpId: number): Observable<Chirp> {
    return this.http.get<Chirp>(`https://localhost:3000/api/chirps/${chirpId}`);
  }

  getRepliesTo (chirpId: number): Observable<Chirp[]> {
    return this.http.get<Chirp[]>(`https://localhost:3000/api/chirps/${chirpId}/replies`);
  }

  getChirpImage (chirpId: number): Observable<SafeUrl> {
    const cachedUrl = this.chirpImages.get(chirpId);
    if (cachedUrl) {
      return of(cachedUrl);
    }
    return this.http.get(`https://localhost:3000/api/chirps/${chirpId}/image`, { responseType: "blob" }).pipe(
      map(blob => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob))),
      tap(imageUrl => this.chirpImages.set(chirpId, imageUrl))
    );
  }

  searchChirps (searchText: string): Observable<Chirp[]> {
    return this.http.get<Chirp[]>("https://localhost:3000/api/chirps/search", { params: { searchText } });
  }

  // POST requests
  createChirp (data: FormData): Observable<number> {
    return this.http.post<number>(`https://localhost:3000/api/chirps`, data);
  }

  starChirpById (chirpId: number, userId: number, starred: boolean): Observable<number> {
    return this.http.post<number>(`https://localhost:3000/api/chirps/${chirpId}/stars/${userId}`, { starred });
  }

  // DELETE requests
  deleteChirp (chirpId: number): Observable<number> {
    return this.http.delete<number>(`https://localhost:3000/api/chirps/${chirpId}`);
  }
}
