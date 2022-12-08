import { Component } from '@angular/core';
import { Chirp } from 'src/app/models/chirp.model';
import { ChirpsService } from 'src/app/services/chirps.service';

@Component({
  selector: 'app-page-timeline',
  templateUrl: './page-timeline.component.html',
  styleUrls: ['./page-timeline.component.scss']
})
export class PageTimelineComponent {
  constructor(private chirpsService: ChirpsService) {}

  currentPage!: string
  chirps!: Chirp[];

  ngOnInit() {
    this.currentPage = "timeline";
    this.chirps = [...this.chirpsService.chirps, ...this.chirpsService.chirps, ...this.chirpsService.chirps];
  }
}
