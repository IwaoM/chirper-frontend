import { Component, OnDestroy } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Observable, Subject, take, takeUntil, tap } from "rxjs";
import { Chirp } from "src/app/core/models/chirp.model";
import { User } from "src/app/core/models/user.model";
import { AuthService } from "src/app/core/services/auth.service";
import { ChirpsService } from "src/app/core/services/chirps.service";
import { UsersService } from "src/app/core/services/users.service";

@Component({
  selector: "app-page-search",
  templateUrl: "./page-search.component.html",
  styleUrls: ["./page-search.component.scss"]
})
export class PageSearchComponent implements OnDestroy {

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private usersService: UsersService,
    private chirpsService: ChirpsService,
  ) {
    this.destroy$ = new Subject<boolean>;
    router.events.pipe(
      takeUntil(this.destroy$)
    ).subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.connectedUser = this.authService.getConnectedUser();
        this.selectedSearchTabIndex = +this.route.snapshot.queryParams["tab"];

        this.initPage();
      }
    });
  }

  private destroy$!: Subject<boolean>;

  connectedUser!: User;
  searchChirps$!: Observable<Chirp[]>;
  searchUsers$!: Observable<User[]>;

  repliedToChirps!: Map<number, Observable<Chirp>>;
  profilePicUrls!: Map<number, Observable<SafeUrl>>;
  chirpImageUrls!: Map<number, Observable<SafeUrl>>;
  chirpsStarredByConnectedUser$!: Observable<number[]>;
  starredMap!: Map<number, boolean>;

  searchTabs = [
    { title: "Chirps" },
    { title: "Utilisateurs" },
  ];
  selectedSearchTabIndex!: number;

  ngOnDestroy (): void {
    this.destroy$.next(true);
  }

  initPage () {
    this.repliedToChirps = new Map();
    this.profilePicUrls = new Map();
    this.chirpImageUrls = new Map();

    this.fillStarredMap();
    if (this.route.snapshot.queryParams["searchText"]) {
      this.searchChirps(this.route.snapshot.queryParams["searchText"]);
      this.searchUsers(this.route.snapshot.queryParams["searchText"]);
    }
  }

  fillStarredMap () {
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

  onTabClick (index: number) {
    if (this.route.snapshot.queryParams["searchText"]) {
      this.router.navigateByUrl(`/search?tab=${index}&searchText=${this.route.snapshot.queryParams["searchText"]}`);
    } else {
      this.router.navigateByUrl(`/search?tab=${index}`);
    }
  }

  onSearch (searchText: string) {
    this.router.navigateByUrl(`/search?tab=${this.route.snapshot.queryParams["tab"]}&searchText=${encodeURIComponent(searchText)}`);
  }

  searchChirps (searchText: string) {
    // get a list of all chirps that contain the searched text, then populate repliedToChirps, profilePicUrls & chirpImageUrls
    this.searchChirps$ = this.chirpsService.searchChirps(searchText).pipe(
      tap(chirps => {
        for (let i = 0; i < chirps.length; i++) {
          if (chirps[i].reply_to_id && !this.repliedToChirps.has(chirps[i].id)) {
            // if the chirp is a reply, add an entry to the repliedToChirps map
            this.repliedToChirps.set(
              chirps[i].id,
              this.chirpsService.getChirpById(chirps[i].reply_to_id || 0).pipe(take(1))
            );
            this.repliedToChirps.get(chirps[i].id)?.subscribe();
          } else if (!chirps[i].reply_to_id && this.repliedToChirps.has(chirps[i].id)) {
            // if the map already has an entry but the chirp is not a reply
            // (ie. it used to be one but is not anymore because the original chirp was deleted), delete the entry
            this.repliedToChirps.delete(chirps[i].id);
          }
          if (!this.profilePicUrls.has(chirps[i].author_id)) {
            // if the author's profile pic url is not stored in the map yet, store it
            this.profilePicUrls.set(
              chirps[i].author_id,
              this.usersService.getUserProfilePic(chirps[i].author_id, chirps[i].pic_updated).pipe(take(1))
            );
            this.profilePicUrls.get(chirps[i].author_id)?.subscribe();
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
      })
    );
  }

  searchUsers (searchText: string) {
    // get a list of all users whose username or handle contains the searched text, then populate profilePicUrls
    this.searchUsers$ = this.usersService.searchUsers(searchText).pipe(
      tap(users => {
        for (let i = 0; i < users.length; i++) {
          if (!this.profilePicUrls.has(users[i].id)) {
            // if the user's profile pic url is not stored in the map yet, store it
            this.profilePicUrls.set(
              users[i].id,
              this.usersService.getUserProfilePic(users[i].id, users[i].pic_updated).pipe(take(1))
            );
            this.profilePicUrls.get(users[i].id)?.subscribe();
          }
        }
      })
    );
  }

  onDeleteChirp () {
    this.fillStarredMap();
    this.searchChirps(this.route.snapshot.queryParams["searchText"]); // update the search results even if query is unchanged
    if (this.route.snapshot.queryParams["searchText"]) {
      this.searchUsers(this.route.snapshot.queryParams["searchText"]);
    }
  }

  onStarChirp () {
    this.fillStarredMap();
    if (this.route.snapshot.queryParams["searchText"]) {
      this.searchChirps(this.route.snapshot.queryParams["searchText"]);
      this.searchUsers(this.route.snapshot.queryParams["searchText"]);
    }
  }

}
