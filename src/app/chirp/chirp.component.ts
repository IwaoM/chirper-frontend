import { Component } from '@angular/core';

@Component({
  selector: 'app-chirp',
  templateUrl: './chirp.component.html',
  styleUrls: ['./chirp.component.scss']
})
export class ChirpComponent {

  author!: {
    username: string,
    handle: string,
    picture: string
  };
  timestamp!: Date;
  text!: string;
  image!: string;
  starCount!: number;
  answerCount!: number;

  ngOnInit() {
    this.author = {
      username: "Iwao Meunier",
      handle: "iwaoM_",
      picture: "assets/userPictures/1.png"
    }
    this.timestamp = new Date();
    this.text = "sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer";
    this.image = "";
    this.starCount = 89;
    this.answerCount = 52;
  }
}
