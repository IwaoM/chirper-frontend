import { Component, OnInit } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { Observable, take, tap } from "rxjs";
import { Chirp } from "src/app/core/models/chirp.model";
import { User } from "src/app/core/models/user.model";
import { AuthService } from "src/app/core/services/auth.service";
import { ChirpsService } from "src/app/core/services/chirps.service";
import { UsersService } from "src/app/core/services/users.service";

@Component({
  selector: "app-page-timeline",
  templateUrl: "./page-timeline.component.html",
  styleUrls: ["./page-timeline.component.scss"]
})
export class PageTimelineComponent implements OnInit {
  constructor (
    private authService: AuthService,
    private chirpsService: ChirpsService,
    private usersService: UsersService,
  ) {}

  chirps$!: Observable<Chirp[]>;

  chirpsStarredByConnectedUser$!: Observable<number[]>;
  starredMap!: Map<number, boolean>;

  repliedToChirps!: Map<number, Chirp | null>;
  authorProfilePicUrls!: Map<number, Observable<SafeUrl>>;
  chirpImageUrls!: Map<number, Observable<SafeUrl>>;

  connectedUser!: User;

  ngOnInit () {
    this.connectedUser = this.authService.getConnectedUser();

    this.repliedToChirps = new Map();
    this.authorProfilePicUrls = new Map();
    this.chirpImageUrls = new Map();

    this.fillStarredMap();
    this.getChirpList();
  }

  fillStarredMap () {
    // reset the map & refill it
    this.starredMap = new Map();
    this.chirpsStarredByConnectedUser$ = this.usersService.getUserStarIds(this.connectedUser.id).pipe(
      tap(list => {
        for (let i = 0; i < list.length; i++) {
          if (!this.starredMap.has(list[i])) {
            this.starredMap.set(list[i], true);
          }
        }
      }),
      take(1)
    );
    this.chirpsStarredByConnectedUser$.subscribe();
  }

  getChirpList () {
    // get a list of all chirps, then populate repliedToChirps, authorProfilePicUrls & chirpImageUrls
    this.chirps$ = this.chirpsService.getAllChirps().pipe(
      tap(
        chirps => {
          for (let i = 0; i < chirps.length; i++) {
            if (chirps[i].reply_to_id && !this.repliedToChirps.has(chirps[i].id)) {
              // if the chirp is a reply, add an entry to the repliedToChirps map
              this.repliedToChirps.set(chirps[i].id, chirps.find(elem => elem.id === chirps[i].reply_to_id) || null);
            } else if (!chirps[i].reply_to_id && this.repliedToChirps.has(chirps[i].id)) {
              // if the map already has an entry but the chirp is not a reply
              // (ie. it used to be one but is not anymore because the original chirp was deleted), delete the entry
              this.repliedToChirps.delete(chirps[i].id);
            }
            if (!this.authorProfilePicUrls.has(chirps[i].author_id)) {
              // if the author's profile pic url is not stored in the map yet, store it
              this.authorProfilePicUrls.set(
                chirps[i].author_id,
                this.usersService.getUserProfilePic(chirps[i].author_id).pipe(take(1))
              );
              this.authorProfilePicUrls.get(chirps[i].author_id)?.subscribe();
            }
            if (!this.chirpImageUrls.has(chirps[i].id) && chirps[i].image) {
              // if the chirp has an image and its url is not stored in the map yet, store it
              this.chirpImageUrls.set(
                chirps[i].id,
                this.chirpsService.getChirpImage(chirps[i].id).pipe(take(1))
              );
              this.chirpImageUrls.get(chirps[i].id)?.subscribe();
            }
          }
        }
      )
    );
  }

  onNewChirp () {
    this.fillStarredMap();
    this.getChirpList();
  }

  onDeleteChirp () {
    this.fillStarredMap();
    this.getChirpList();
  }
}
