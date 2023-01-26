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
    console.log(`calling getAllChirps()`);
    return this.http.get<Chirp[]>("https://localhost:3000/api/chirps");
  }

  getChirpById (chirpId: number): Observable<Chirp> {
    console.log(`calling getChirpById(${chirpId})`);
    return this.http.get<Chirp>(`https://localhost:3000/api/chirps/${chirpId}`);
  }

  getRepliesTo (chirpId: number): Observable<Chirp[]> {
    console.log(`calling getRepliesTo(${chirpId})`);
    return this.http.get<Chirp[]>(`https://localhost:3000/api/chirps/${chirpId}/replies`);
  }

  getChirpImage (chirpId: number): Observable<SafeUrl> {
    console.log(`calling getChirpImage(${chirpId})`);
    return this.http.get(`https://localhost:3000/api/chirps/${chirpId}/image`, { responseType: "blob" }).pipe(
      map(blob => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)))
    );
  }

  searchChirps (searchText: string): Observable<Chirp[]> {
    console.log(`calling searchChirps(${searchText})`);
    return this.http.get<Chirp[]>("https://localhost:3000/api/chirps/search", { params: { searchText } });
  }

  // POST requests
  createChirp (data: FormData): Observable<number> {
    console.log(`calling createChirp() with the following FormData:`);
    console.log(data);
    return this.http.post<number>(`https://localhost:3000/api/chirps`, data);
  }

  starChirpById (chirpId: number, userId: number, starred: boolean): Observable<number> {
    console.log(`calling starChirpById(${chirpId}, ${userId}, ${starred})`);
    return this.http.post<number>(`https://localhost:3000/api/chirps/${chirpId}/stars/${userId}`, { starred });
  }

  // DELETE requests
  deleteChirp (chirpId: number): Observable<number> {
    console.log(`calling deleteChirp(${chirpId})`);
    return this.http.delete<number>(`https://localhost:3000/api/chirps/${chirpId}`);
  }
}
