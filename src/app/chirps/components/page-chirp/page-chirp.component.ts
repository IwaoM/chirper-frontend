import { AfterContentInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Observable } from "rxjs";
import { ChirpsService } from "src/app/core/services/chirps.service";
import { Chirp } from "../../../core/models/chirp.model";

@Component({
  selector: "app-page-chirp",
  templateUrl: "./page-chirp.component.html",
  styleUrls: ["./page-chirp.component.scss"]
})
export class PageChirpComponent implements OnInit, AfterContentInit {
  constructor (
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

  ngOnInit () {
    this.onNavigationToChirpPage();
  }

  ngAfterContentInit () {
    if (this.route.snapshot.queryParams["action"] === "reply") {
      document.getElementById("chirpTextArea")?.focus();
    }
  }

  onNavigationToChirpPage () {
    this.chirpId = +this.route.snapshot.params["id"];
    this.currentPage = "singleChirp";
    this.currentTitle = "Chirp";
    this.focusedChirp$ = this.chirpsService.getChirpById(this.chirpId);
    this.replyChirps$ = this.chirpsService.getRepliesTo(this.chirpId);
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
