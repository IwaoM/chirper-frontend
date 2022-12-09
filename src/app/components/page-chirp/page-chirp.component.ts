import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChirpsService } from 'src/app/services/chirps.service';
import { Chirp } from '../../models/chirp.model';

@Component({
  selector: 'app-page-chirp',
  templateUrl: './page-chirp.component.html',
  styleUrls: ['./page-chirp.component.scss']
})
export class PageChirpComponent implements OnInit {
  constructor(
    private chirpsService: ChirpsService,
    private route: ActivatedRoute
  ) {}

  currentPage!: string;
  focusedChirp!: Chirp;
  replyChirps!: Chirp[];

  ngOnInit() {
    const chirpId = +this.route.snapshot.params["id"];
    this.currentPage = "singleChirp";
    this.focusedChirp = this.chirpsService.getChirpById(chirpId);
    this.replyChirps = this.chirpsService.chirps;
  }
}
