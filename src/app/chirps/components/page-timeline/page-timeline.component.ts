import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Chirp } from "src/app/core/models/chirp.model";
import { ChirpsService } from "src/app/core/services/chirps.service";

@Component({
  selector: "app-page-timeline",
  templateUrl: "./page-timeline.component.html",
  styleUrls: ["./page-timeline.component.scss"]
})
export class PageTimelineComponent implements OnInit {
  constructor (private chirpsService: ChirpsService) {}

  currentPage!: string;
  currentTitle!: string;
  chirps$!: Observable<Chirp[]>;

  ngOnInit () {
    this.currentPage = "timeline";
    this.currentTitle = "Derniers chirps";
    this.chirps$ = this.chirpsService.getAllChirps();
  }

  onNewChirp () {
    this.chirps$ = this.chirpsService.getAllChirps();
  }

  onDeleteChirp () {
    this.chirps$ = this.chirpsService.getAllChirps();
  }
}
