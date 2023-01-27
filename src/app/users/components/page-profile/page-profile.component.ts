import { Component, OnInit } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { Chirp } from "src/app/core/models/chirp.model";
import { User } from "src/app/core/models/user.model";
import { AuthService } from "src/app/core/services/auth.service";
import { ChirpsService } from "src/app/core/services/chirps.service";
import { UsersService } from "src/app/core/services/users.service";

@Component({
  selector: "app-page-profile",
  templateUrl: "./page-profile.component.html",
  styleUrls: ["./page-profile.component.scss"]
})
export class PageProfileComponent implements OnInit {
  constructor (
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService,
    private chirpsService: ChirpsService,
    private route: ActivatedRoute,
  ) {
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.connectedUser = this.authService.getConnectedUser();
        this.pageUserId = +this.route.snapshot.params["id"];
        this.pageType = this.pageUserId === this.connectedUser.id ? "ownProfile" : "profile";
        this.selectedProfileTabIndex = +this.route.snapshot.queryParams["tab"];

        this.initPage();
      }
    });
  }

  pageType!: "profile" | "ownProfile";
  pageUserId!: number;
  connectedUser!: User;

  user$!: Observable<User>;
  profilePictureUrl$!: Observable<SafeUrl>;
  userChirps$!: Observable<Chirp[]>;
  userStars$!: Observable<Chirp[]>;

  repliedToChirps!: Map<number, Observable<Chirp>>;
  authorProfilePicUrls!: Map<number, Observable<SafeUrl>>;
  chirpImageUrls!: Map<number, Observable<SafeUrl>>;
  chirpsStarredByConnectedUser$!: Observable<number[]>;
  starredMap!: Map<number, boolean>;

  profileTabs = [
    { title: "Chirps" },
    { title: "Étoiles" },
  ];
  selectedProfileTabIndex!: number;

  ngOnInit () {
    this.initPage();
  }

  initPage () {
    this.connectedUser = this.authService.getConnectedUser();
    this.pageUserId = +this.route.snapshot.params["id"];
    this.pageType = this.pageUserId === this.connectedUser.id ? "ownProfile" : "profile";

    this.repliedToChirps = new Map();
    this.authorProfilePicUrls = new Map();
    this.chirpImageUrls = new Map();

    this.initUserCard();
    this.fillStarredMap();
    this.getUserChirpList();
    this.getUserStarList();
  }

  initUserCard () {
    // get data for the user card
    this.user$ = this.usersService.getUserById(this.pageUserId);
    this.profilePictureUrl$ = this.usersService.getUserProfilePic(this.pageUserId);
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
      })
    );
    this.chirpsStarredByConnectedUser$.subscribe();
  }

  getUserChirpList () {
    // get a list of all of the visited profile's user's chirps, then populate repliedToChirps, authorProfilePicUrls & chirpImageUrls
    this.userChirps$ = this.usersService.getUserChirps(this.pageUserId).pipe(
      tap(
        chirps => {
          for (let i = 0; i < chirps.length; i++) {
            if (chirps[i].reply_to_id && !this.repliedToChirps.has(chirps[i].id)) {
              // if the chirp is a reply, add an entry to the repliedToChirps map
              this.repliedToChirps.set(chirps[i].id, this.chirpsService.getChirpById(chirps[i].reply_to_id || 0));
              this.repliedToChirps.get(chirps[i].id)?.subscribe();
            } else if (!chirps[i].reply_to_id && this.repliedToChirps.has(chirps[i].id)) {
              // if the map already has an entry but the chirp is not a reply
              // (ie. it used to be one but is not anymore because the original chirp was deleted), delete the entry
              this.repliedToChirps.delete(chirps[i].id);
            }
            if (!this.authorProfilePicUrls.has(chirps[i].author_id)) {
              // if the author's profile pic url is not stored in the map yet, store it
              this.authorProfilePicUrls.set(chirps[i].author_id, this.usersService.getUserProfilePic(chirps[i].author_id));
              this.authorProfilePicUrls.get(chirps[i].author_id)?.subscribe();
            }
            if (!this.chirpImageUrls.has(chirps[i].id) && chirps[i].image) {
              // if the chirp has an image and its url is not stored in the map yet, store it
              this.chirpImageUrls.set(chirps[i].id, this.chirpsService.getChirpImage(chirps[i].id));
              this.chirpImageUrls.get(chirps[i].id)?.subscribe();
            }
          }
        }
      )
    );
  }

  getUserStarList () {
    // get a list of all of the visited profile's user's stars, then populate repliedToChirps, authorProfilePicUrls & chirpImageUrls
    this.userStars$ = this.usersService.getUserStars(this.pageUserId).pipe(
      tap(
        chirps => {
          for (let i = 0; i < chirps.length; i++) {
            if (chirps[i].reply_to_id && !this.repliedToChirps.has(chirps[i].id)) {
              // if the chirp is a reply, add an entry to the repliedToChirps map
              this.repliedToChirps.set(chirps[i].id, this.chirpsService.getChirpById(chirps[i].reply_to_id || 0));
              this.repliedToChirps.get(chirps[i].id)?.subscribe();
            } else if (!chirps[i].reply_to_id && this.repliedToChirps.has(chirps[i].id)) {
              // if the map already has an entry but the chirp is not a reply
              // (ie. it used to be one but is not anymore because the original chirp was deleted), delete the entry
              this.repliedToChirps.delete(chirps[i].id);
            }
            if (!this.authorProfilePicUrls.has(chirps[i].author_id)) {
              // if the author's profile pic url is not stored in the map yet, store it
              this.authorProfilePicUrls.set(chirps[i].author_id, this.usersService.getUserProfilePic(chirps[i].author_id));
              this.authorProfilePicUrls.get(chirps[i].author_id)?.subscribe();
            }
            if (!this.chirpImageUrls.has(chirps[i].id) && chirps[i].image) {
              // if the chirp has an image and its url is not stored in the map yet, store it
              this.chirpImageUrls.set(chirps[i].id, this.chirpsService.getChirpImage(chirps[i].id));
              this.chirpImageUrls.get(chirps[i].id)?.subscribe();
            }
          }
        }
      )
    );
  }

  onTabClick (index: number) {
    this.router.navigateByUrl(`/users/${this.pageUserId}?tab=${index}`);
  }

  onDeleteChirp () {
    this.fillStarredMap();
    this.getUserChirpList();
    this.getUserStarList();
  }

  onStarChirp () {
    this.fillStarredMap();
    this.getUserChirpList();
    this.getUserStarList();
  }
}
