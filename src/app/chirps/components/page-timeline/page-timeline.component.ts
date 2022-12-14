import { Component, OnInit } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { Observable, tap } from "rxjs";
import { Chirp } from "src/app/core/models/chirp.model";
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
  repliedToChirps!: Map<number, Chirp | null>;
  chirpsStarredByConnectedUser$!: Observable<{ chirp_id: number }[]>;
  chirpsStarredByConnectedUserArray!: number[];

  authorProfilePicUrls!: Map<number, Observable<SafeUrl>>;
  chirpImageUrls!: Map<number, Observable<SafeUrl>>;

  connectedUser!: {
    id: number
  };

  ngOnInit () {
    this.connectedUser = {
      id: this.authService.getConnectedUserId()
    };

    this.repliedToChirps = new Map();
    this.authorProfilePicUrls = new Map();
    this.chirpImageUrls = new Map();

    this.chirps$ = this.chirpsService.getAllChirps().pipe(
      tap(
        chirps => {
          for (let i = 0; i < chirps.length; i++) {
            if (chirps[i].reply_to_id) {
              this.repliedToChirps.set(chirps[i].id, chirps.find(elem => elem.id === chirps[i].reply_to_id) || null);
            }
            if (!this.authorProfilePicUrls.has(chirps[i].author_id)) {
              this.authorProfilePicUrls.set(chirps[i].author_id, this.usersService.getUserProfilePic(chirps[i].author_id));
              this.authorProfilePicUrls.get(chirps[i].author_id)?.subscribe();
            }
            if (chirps[i].image) {
              this.chirpImageUrls.set(chirps[i].id, this.chirpsService.getChirpImage(chirps[i].id));
              this.chirpImageUrls.get(chirps[i].id)?.subscribe();
            }
          }
        }
      )
    );
    this.chirpsStarredByConnectedUser$ = this.chirpsService.getAllStarredByUser(this.connectedUser.id).pipe(
      tap(list => this.chirpsStarredByConnectedUserArray = list.map(elem => elem.chirp_id))
    );
    this.chirpsStarredByConnectedUser$.subscribe();
  }

  onNewChirp () {
    this.chirps$ = this.chirpsService.getAllChirps();
  }

  onDeleteChirp () {
    this.chirps$ = this.chirpsService.getAllChirps();
  }
}
