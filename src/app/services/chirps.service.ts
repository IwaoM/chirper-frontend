import { Injectable } from "@angular/core";
import { Chirp } from "../models/chirp.model";

@Injectable({
  providedIn: "root"
})
export class ChirpsService {

  chirps: Chirp[] = [
    {
      id: 1,
      timestamp: new Date(),
      text: "Chirp 1 - sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer",
      // image: "assets/chirpImages/2.png",
      author: {
        id: 1,
        username: "Iwao Meunier",
        handle: "iwaoM_",
        picture: "assets/userPictures/1.png"
      },
      starred: false,
      starCount: 89,
      replyCount: 52
    },
    {
      id: 2,
      timestamp: new Date(),
      text: "Chirp 2 - sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer",
      // image: "assets/chirpImages/2.png",
      author: {
        id: 1,
        username: "Iwao Meunier",
        handle: "iwaoM_",
        picture: "assets/userPictures/1.png"
      },
      starred: false,
      starCount: 89,
      replyCount: 52
    },
    {
      id: 3,
      timestamp: new Date(),
      text: "Chirp 3 - sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer",
      // image: "assets/chirpImages/2.png",
      author: {
        id: 1,
        username: "Iwao Meunier",
        handle: "iwaoM_",
        picture: "assets/userPictures/1.png"
      },
      starred: false,
      starCount: 89,
      replyCount: 52
    },
    {
      id: 4,
      timestamp: new Date(),
      text: "Chirp 4 - sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer",
      // image: "assets/chirpImages/2.png",
      author: {
        id: 1,
        username: "Iwao Meunier",
        handle: "iwaoM_",
        picture: "assets/userPictures/1.png"
      },
      starred: false,
      starCount: 89,
      replyCount: 52
    },
  ];

  getAllChirps (): Chirp[] {
    return this.chirps;
    // todo add api call to /api/chirps
  }

  getChirpById (chirpId: number): Chirp {
    const chirp = this.chirps.find(ch => ch.id === chirpId);
    if (chirp) {
      return chirp;
    } else {
      throw new Error("Chirp does not exist");
    }
    // todo add api call to /api/chirps/:id
  }

  starChirpById (chirpId: number): void {
    const chirp = this.chirps.find(ch => ch.id === chirpId);
    if (chirp) {
      chirp.starred = !chirp.starred;
      chirp.starred ? chirp.starCount++ : chirp.starCount--;
    } else {
      throw new Error("Chirp does not exist");
    }
    // todo add api call to /api/chirps/:id/star (post/delete)
  }

}
