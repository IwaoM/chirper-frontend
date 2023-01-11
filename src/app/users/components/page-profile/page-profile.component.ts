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
        this.onNavigationToProfilePage();
      }
    });
  }

  pageType!: "profile" | "ownProfile";
  userId!: number;
  connectedUser!: { id: number };

  user$!: Observable<User>;
  profilePictureUrl$!: Observable<SafeUrl>;
  userChirps$!: Observable<Chirp[]>;
  userStars$!: Observable<Chirp[]>;

  repliedToChirps!: Map<number, Observable<Chirp>>;
  authorProfilePicUrls!: Map<number, Observable<SafeUrl>>;
  chirpImageUrls!: Map<number, Observable<SafeUrl>>;

  chirpsStarredByConnectedUser$!: Observable<{ chirp_id: number }[]>;
  starredMap!: Map<number, boolean>;

  profileTabs!: { title: string }[];
  selectedProfileTabIndex!: number;

  ngOnInit () {
    this.onNavigationToProfilePage();

    this.profileTabs = [
      { title: "Chirps" },
      { title: "Étoiles" },
    ];
    this.selectedProfileTabIndex = 0;
  }

  onNavigationToProfilePage () {
    this.userId = +this.route.snapshot.params["id"];
    this.connectedUser = { id: this.authService.getConnectedUserId() };
    this.pageType = this.userId === this.connectedUser.id ? "ownProfile" : "profile";

    this.repliedToChirps = new Map();
    this.authorProfilePicUrls = new Map();
    this.chirpImageUrls = new Map();
    this.starredMap = new Map();

    this.user$ = this.usersService.getUserById(this.userId);
    this.profilePictureUrl$ = this.usersService.getUserProfilePic(this.userId);

    this.chirpsStarredByConnectedUser$ = this.usersService.getUserStarIds(this.connectedUser.id).pipe(
      tap(list => {
        for (let i = 0; i < list.length; i++) {
          if (!this.starredMap.has(list[i].chirp_id)) {
            this.starredMap.set(list[i].chirp_id, true);
          }
        }
      })
    );
    this.chirpsStarredByConnectedUser$.subscribe();

    this.userChirps$ = this.usersService.getUserChirps(this.userId).pipe(
      tap(
        chirps => {
          for (let i = 0; i < chirps.length; i++) {
            if (chirps[i].reply_to_id && !this.repliedToChirps.has(chirps[i].id)) {
              this.repliedToChirps.set(chirps[i].id, this.chirpsService.getChirpById(chirps[i].reply_to_id || 0));
              this.repliedToChirps.get(chirps[i].id)?.subscribe();
            }
            if (!this.authorProfilePicUrls.has(chirps[i].author_id)) {
              this.authorProfilePicUrls.set(chirps[i].author_id, this.usersService.getUserProfilePic(chirps[i].author_id));
              this.authorProfilePicUrls.get(chirps[i].author_id)?.subscribe();
            }
            if (chirps[i].image && !this.chirpImageUrls.has(chirps[i].id)) {
              this.chirpImageUrls.set(chirps[i].id, this.chirpsService.getChirpImage(chirps[i].id));
              this.chirpImageUrls.get(chirps[i].id)?.subscribe();
            }
          }
        }
      )
    );
    this.userChirps$.subscribe();

    this.userStars$ = this.usersService.getUserStars(this.userId).pipe(
      tap(
        chirps => {
          for (let i = 0; i < chirps.length; i++) {
            if (chirps[i].reply_to_id && !this.repliedToChirps.has(chirps[i].id)) {
              this.repliedToChirps.set(chirps[i].id, this.chirpsService.getChirpById(chirps[i].reply_to_id || 0));
              this.repliedToChirps.get(chirps[i].id)?.subscribe();
            }
            if (!this.authorProfilePicUrls.has(chirps[i].author_id)) {
              this.authorProfilePicUrls.set(chirps[i].author_id, this.usersService.getUserProfilePic(chirps[i].author_id));
              this.authorProfilePicUrls.get(chirps[i].author_id)?.subscribe();
            }
            if (chirps[i].image && !this.chirpImageUrls.has(chirps[i].id)) {
              this.chirpImageUrls.set(chirps[i].id, this.chirpsService.getChirpImage(chirps[i].id));
              this.chirpImageUrls.get(chirps[i].id)?.subscribe();
            }
          }
        }
      )
    );
    this.userStars$.subscribe();
  }

  onTabClick (index: number) {
    this.selectedProfileTabIndex = index;
  }

  onDeleteChirp () {
    this.onNavigationToProfilePage();
  }

  onStarChirp () {
    this.onNavigationToProfilePage();
  }
}
