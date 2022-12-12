import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Chirp } from "../models/chirp.model";

@Injectable({
  providedIn: "root"
})
export class ChirpsService {
  constructor (private http: HttpClient) {}

  getAllChirps (): Observable<Chirp[]> {
    return this.http.get<Chirp[]>("http://localhost:3000/api/chirps");
  }

  getChirpById (chirpId: number): Observable<Chirp> {
    return this.http.get<Chirp[]>(`http://localhost:3000/api/chirps/${chirpId}`).pipe(
      map(entries => entries[0])
    );
  }

  // starChirpById (chirpId: number): void {
  //   const chirp = this.chirps.find(ch => ch.id === chirpId);
  //   if (chirp) {
  //     chirp.starred = !chirp.starred;
  //     chirp.starred ? chirp.starCount++ : chirp.starCount--;
  //   } else {
  //     throw new Error("Chirp does not exist");
  //   }
  //   // todo add api call to /api/chirps/:id/star (post/delete)
  // }

}
