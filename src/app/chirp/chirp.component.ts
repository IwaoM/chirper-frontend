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
  deleteHovered!: boolean;
  text!: string;
  image!: string;
  starred!: boolean;
  starHovered!: boolean;
  starCount!: number;
  answerHovered!: boolean;
  answerCount!: number;

  ngOnInit() {
    this.author = {
      username: "Iwao Meunier",
      handle: "iwaoM_",
      picture: "assets/userPictures/1.png"
    }
    this.timestamp = new Date();
    this.deleteHovered = false;
    this.text = "sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer";
    this.image = "";
    // this.image = "assets/chirpImages/2.png";
    this.starred = false;
    this.starHovered = false;
    this.starCount = 89;
    this.answerHovered = false;
    this.answerCount = 52;
  }

  // Chirp box events
  onChirpClick() {
    // todo : open chirp page
  }

  // Author pp, name or handle events
  onAuthorClick() {
    // todo : open author profile page
  }

  // Delete button events
  onDeleteMouseEnter() {
    this.deleteHovered = true;
  }

  onDeleteMouseLeave() {
    this.deleteHovered = false;
  }

  onDeleteClick() {
    // todo : delete the chirp (API)
  }

  // Star button events
  onStarMouseEnter() {
    this.starHovered = true;
  }

  onStarMouseLeave() {
    this.starHovered = false;
  }

  onStarClick() {
    this.starred = !this.starred;
    this.starred ? this.starCount++ : this.starCount--;
    // todo : add a star to the chirp from the logged in user
  }

  // Answer button events
  onAnswerMouseEnter() {
    this.answerHovered = true;
  }

  onAnswerMouseLeave() {
    this.answerHovered = false;
  }

  onAnswerClick() {
    // todo : open chirp page and focus on the answer field
  }
}
