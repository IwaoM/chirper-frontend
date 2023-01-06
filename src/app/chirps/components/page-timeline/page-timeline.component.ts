import { Component, OnInit } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Chirp } from "src/app/core/models/chirp.model";
import { AuthService } from "src/app/core/services/auth.service";
import { ChirpsService } from "src/app/core/services/chirps.service";

@Component({
  selector: "app-page-timeline",
  templateUrl: "./page-timeline.component.html",
  styleUrls: ["./page-timeline.component.scss"]
})
export class PageTimelineComponent implements OnInit {
  constructor (
    private authService: AuthService,
    private chirpsService: ChirpsService
  ) {}

  currentPage!: string;
  currentTitle!: string;
  chirps$!: Observable<Chirp[]>;
  chirpsStarredByConnectedUser$!: Observable<{ chirp_id: number }[]>;
  chirpsStarredByConnectedUserArray!: number[];

  connectedUser!: {
    id: number
  };

  ngOnInit () {
    this.connectedUser = {
      id: this.authService.getConnectedUserId()
    };

    this.currentPage = "timeline";
    this.currentTitle = "Derniers chirps";
    this.chirps$ = this.chirpsService.getAllChirps();
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

  onNewChirp () {
    this.chirps$ = this.chirpsService.getAllChirps();
  }

  onDeleteChirp () {
    this.chirps$ = this.chirpsService.getAllChirps();
  }
}
