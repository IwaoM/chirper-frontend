import { Component } from '@angular/core';
import { ChirpsService } from 'src/app/services/chirps.service';
import { Chirp } from '../../models/chirp.model';

@Component({
  selector: 'app-page-chirp',
  templateUrl: './page-chirp.component.html',
  styleUrls: ['./page-chirp.component.scss']
})
export class PageChirpComponent {
  constructor(private chirpsService: ChirpsService) {}

  currentPage!: string;
  chirps!: Chirp[];

  ngOnInit() {
    this.currentPage = "timeline";
    this.chirps = this.chirpsService.chirps;
  }
}
