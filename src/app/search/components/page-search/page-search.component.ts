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
  selector: "app-page-search",
  templateUrl: "./page-search.component.html",
  styleUrls: ["./page-search.component.scss"]
})
export class PageSearchComponent implements OnInit {

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private usersService: UsersService,
    private chirpsService: ChirpsService,
  ) {
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.initPage();
      }
    });
  }

  connectedUser!: User;
  searchChirps$!: Observable<Chirp[]>;
  searchUsers$!: Observable<User[]>;

  repliedToChirps!: Map<number, Observable<Chirp>>;
  authorProfilePicUrls!: Map<number, Observable<SafeUrl>>;
  chirpImageUrls!: Map<number, Observable<SafeUrl>>;
  chirpsStarredByConnectedUser$!: Observable<number[]>;
  starredMap!: Map<number, boolean>;

  searchTabs = [
    { title: "Chirps" },
    { title: "Utilisateurs" },
  ];
  selectedSearchTabIndex!: number;

  ngOnInit () {
    this.initPage();
  }

  initPage () {
    if (this.route.snapshot.queryParams["searchText"]) {
      this.searchChirps(this.route.snapshot.queryParams["searchText"]);
    }
    this.selectedSearchTabIndex = 0;

    this.connectedUser = this.authService.getConnectedUser();

    this.repliedToChirps = new Map();
    this.authorProfilePicUrls = new Map();
    this.chirpImageUrls = new Map();
    this.starredMap = new Map();

    this.fillStarredMap();
  }

  fillStarredMap () {
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

  onTabClick (index: number) {
    this.selectedSearchTabIndex = index;
  }

  onSearch (searchText: string) {
    this.router.navigateByUrl(`/search?searchText=${encodeURIComponent(searchText)}`);
  }

  searchChirps (searchText: string) {
    this.searchChirps$ = this.chirpsService.searchChirps(searchText).pipe(
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
  }

  onDeleteChirp () {
    this.initPage();
  }

  onStarChirp () {
    this.initPage();
  }

}
