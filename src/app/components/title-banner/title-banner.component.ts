import { Component } from '@angular/core';

@Component({
  selector: 'app-title-banner',
  templateUrl: './title-banner.component.html',
  styleUrls: ['./title-banner.component.scss']
})
export class TitleBannerComponent {
  title!: string;

  ngOnInit() {
    this.title = "Derniers chirps"
    // todo : adapt the title based on the displayed page
  }
}
