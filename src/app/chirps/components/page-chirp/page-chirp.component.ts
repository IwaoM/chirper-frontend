import { AfterContentInit, Component, OnDestroy } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Observable, Subject, take, takeUntil, tap } from "rxjs";
import { User } from "src/app/core/models/user.model";
import { AuthService } from "src/app/core/services/auth.service";
import { ChirpsService } from "src/app/core/services/chirps.service";
import { UsersService } from "src/app/core/services/users.service";
import { Chirp } from "../../../core/models/chirp.model";

@Component({
  selector: "app-page-chirp",
  templateUrl: "./page-chirp.component.html",
  styleUrls: ["./page-chirp.component.scss"]
})
export class PageChirpComponent implements OnDestroy, AfterContentInit {
  constructor (
    private authService: AuthService,
    private chirpsService: ChirpsService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.destroy$ = new Subject<boolean>;
    router.events.pipe(
      takeUntil(this.destroy$)
    ).subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.connectedUser = this.authService.getConnectedUser();
        this.chirpId = +this.route.snapshot.params["id"];

        this.initPage();
      }
    });
  }

  private destroy$!: Subject<boolean>;

  chirpId!: number;

  chirpsStarredByConnectedUser$!: Observable<number[]>;
  starredMap!: Map<number, boolean>;

  focusedChirp$!: Observable<Chirp>;
  repliedToChirp$!: Observable<Chirp> | null;
  replyChirps$!: Observable<Chirp[]>;

  authorProfilePicUrls!: Map<number, Observable<SafeUrl>>;
  chirpImageUrls!: Map<number, Observable<SafeUrl>>;

  connectedUser!: User;

  ngOnDestroy (): void {
    this.destroy$.next(true);
  }

  ngAfterContentInit () {
    if (this.route.snapshot.queryParams["action"] === "reply") {
      document.getElementById("chirpTextArea")?.focus();
    }
  }

  initPage () {
    this.authorProfilePicUrls = new Map();
    this.chirpImageUrls = new Map();

    this.fillStarredMap();
    this.getFocusedChirp();
    this.getFocusedChirpReplies();
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

  getFocusedChirp () {
    // get the focused chirp, the chirp it is a reply of (if any), then begin populating authorProfilePicUrls & chirpImageUrls
    this.focusedChirp$ = this.chirpsService.getChirpById(this.chirpId).pipe(
      tap(chirp => {
        // get the chirp the focused one replies to
        if (chirp.reply_to_id) {
          this.repliedToChirp$ = this.chirpsService.getChirpById(chirp.reply_to_id);
        }
        if (!this.authorProfilePicUrls.has(chirp.author_id)) {
          // if the author's profile pic url is not stored in the map yet, store it
          this.authorProfilePicUrls.set(
            chirp.author_id,
            this.usersService.getUserProfilePic(chirp.author_id).pipe(take(1))
          );
          this.authorProfilePicUrls.get(chirp.author_id)?.subscribe();
        }
        if (!this.chirpImageUrls.has(chirp.id) && chirp.image) {
          // if the chirp has an image and its url is not stored in the map yet, store it
          this.chirpImageUrls.set(
            chirp.id,
            this.chirpsService.getChirpImage(chirp.id).pipe(take(1))
          );
          this.chirpImageUrls.get(chirp.id)?.subscribe();
        }
      })
    );
  }

  getFocusedChirpReplies () {
    // get a list of all replies to the focused chirp, then finish populating authorProfilePicUrls & chirpImageUrls
    this.replyChirps$ = this.chirpsService.getRepliesTo(this.chirpId).pipe(
      tap(replies => {
        for (let i = 0; i < replies.length; i++) {
          if (!this.authorProfilePicUrls.has(replies[i].author_id)) {
            // if the author's profile pic url is not stored in the map yet, store it
            this.authorProfilePicUrls.set(
              replies[i].author_id,
              this.usersService.getUserProfilePic(replies[i].author_id).pipe(take(1))
            );
            this.authorProfilePicUrls.get(replies[i].author_id)?.subscribe();
          }
          if (!this.chirpImageUrls.has(replies[i].id) && replies[i].image) {
            // if the chirp has an image and its url is not stored in the map yet, store it
            this.chirpImageUrls.set(
              replies[i].id,
              this.chirpsService.getChirpImage(replies[i].id).pipe(take(1))
            );
            this.chirpImageUrls.get(replies[i].id)?.subscribe();
          }
        }
      })
    );
  }

  onNewReply () {
    this.fillStarredMap();
    this.getFocusedChirp();
    this.getFocusedChirpReplies();
  }

  onDeleteReply () {
    this.fillStarredMap();
    this.getFocusedChirp();
    this.getFocusedChirpReplies();
  }

  onDeleteChirp () {
    this.router.navigateByUrl(`app/timeline`);
  }
}
