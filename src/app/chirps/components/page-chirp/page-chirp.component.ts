import { AfterContentInit, Component, OnInit } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { ChirpsService } from "src/app/core/services/chirps.service";
import { UsersService } from "src/app/core/services/users.service";
import { Chirp } from "../../../core/models/chirp.model";

@Component({
  selector: "app-page-chirp",
  templateUrl: "./page-chirp.component.html",
  styleUrls: ["./page-chirp.component.scss"]
})
export class PageChirpComponent implements OnInit, AfterContentInit {
  constructor (
    private authService: AuthService,
    private chirpsService: ChirpsService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.onNavigationToChirpPage();
      }
    });
  }

  chirpId!: number;

  focusedChirp$!: Observable<Chirp>;
  repliedToChirp$!: Observable<Chirp> | null;
  replyChirps$!: Observable<Chirp[]>;
  chirpsStarredByConnectedUser$!: Observable<{ chirp_id: number }[]>;
  chirpsStarredByConnectedUserArray!: number[];

  authorProfilePicUrls!: Map<number, Observable<SafeUrl>>;
  chirpImageUrls!: Map<number, Observable<SafeUrl>>;

  connectedUser!: {
    id: number
  };

  ngOnInit () {
    this.onNavigationToChirpPage();
  }

  ngAfterContentInit () {
    if (this.route.snapshot.queryParams["action"] === "reply") {
      document.getElementById("chirpTextArea")?.focus();
    }
  }

  onNavigationToChirpPage () {
    this.connectedUser = {
      id: this.authService.getConnectedUserId()
    };

    this.chirpId = +this.route.snapshot.params["id"];

    this.authorProfilePicUrls = new Map();
    this.chirpImageUrls = new Map();

    this.focusedChirp$ = this.chirpsService.getChirpById(this.chirpId).pipe(
      tap(chirp => {
        if (chirp.reply_to_id) {
          this.repliedToChirp$ = this.chirpsService.getChirpById(chirp.reply_to_id);
        }
        if (!this.authorProfilePicUrls.has(chirp.author_id)) {
          this.authorProfilePicUrls.set(chirp.author_id, this.usersService.getUserProfilePic(chirp.author_id));
          this.authorProfilePicUrls.get(chirp.author_id)?.subscribe();
        }
        if (chirp.image) {
          this.chirpImageUrls.set(chirp.id, this.chirpsService.getChirpImage(chirp.id));
          this.chirpImageUrls.get(chirp.id)?.subscribe();
        }
      })
    );
    this.replyChirps$ = this.chirpsService.getRepliesTo(this.chirpId).pipe(
      tap(replies => {
        for (let i = 0; i < replies.length; i++) {
          if (!this.authorProfilePicUrls.has(replies[i].author_id)) {
            this.authorProfilePicUrls.set(replies[i].author_id, this.usersService.getUserProfilePic(replies[i].author_id));
            this.authorProfilePicUrls.get(replies[i].author_id)?.subscribe();
          }
          if (replies[i].image) {
            this.chirpImageUrls.set(replies[i].id, this.chirpsService.getChirpImage(replies[i].id));
            this.chirpImageUrls.get(replies[i].id)?.subscribe();
          }
        }
      })
    );
    this.chirpsStarredByConnectedUser$ = this.chirpsService.getAllStarredByUser(this.connectedUser.id).pipe(
      tap(list => {
        this.chirpsStarredByConnectedUserArray = [];
        for (let i = 0; i < list.length; i++) {
          this.chirpsStarredByConnectedUserArray.push(list[i].chirp_id);
        }
      })
    );
    this.chirpsStarredByConnectedUser$.subscribe();
  }

  onNewReply () {
    this.replyChirps$ = this.chirpsService.getRepliesTo(this.chirpId);
  }

  onDeleteChirp () {
    this.router.navigateByUrl(`app/chirps`);
  }

  onDeleteReply () {
    this.replyChirps$ = this.chirpsService.getRepliesTo(this.chirpId);
  }
}
