import { Component } from '@angular/core';

@Component({
  selector: 'app-page-timeline',
  templateUrl: './page-timeline.component.html',
  styleUrls: ['./page-timeline.component.scss']
})
export class PageTimelineComponent {

  currentPage!: string

  ngOnInit() {
    this.currentPage = "singleChirp";
  }
}
