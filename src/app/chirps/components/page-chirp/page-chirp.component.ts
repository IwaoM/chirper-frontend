import { AfterContentInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { ChirpsService } from "src/app/core/services/chirps.service";
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
    private route: ActivatedRoute,
    private router: Router
  ) {
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.onNavigationToChirpPage();
      }
    });
  }

  currentPage!: string;
  currentTitle!: string;
  chirpId!: number;
  focusedChirp$!: Observable<Chirp>;
  replyChirps$!: Observable<Chirp[]>;
  chirpsStarredByConnectedUser$!: Observable<{ chirp_id: number }[]>;
  chirpsStarredByConnectedUserArray!: number[];

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
    this.currentPage = "singleChirp";
    this.currentTitle = "Chirp";
    this.focusedChirp$ = this.chirpsService.getChirpById(this.chirpId);
    this.replyChirps$ = this.chirpsService.getRepliesTo(this.chirpId);
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
