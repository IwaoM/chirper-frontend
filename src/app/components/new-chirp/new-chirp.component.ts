import { Component } from '@angular/core';

@Component({
  selector: 'app-new-chirp',
  templateUrl: './new-chirp.component.html',
  styleUrls: ['./new-chirp.component.scss']
})
export class NewChirpComponent {

  connectedUser!: {
    username: string;
    picture: string
  };
  image!: string;

  ngOnInit() {
    this.connectedUser = {
      username: "Iwao Meunier",
      picture: "assets/userPictures/1.png"
    }
    this.image = "";
  }

  // Connected user pp (next to the new tweet / new answer field)
  onConnectedUserClick() {
    // todo : open own profile page
  }

  // Remove image button
  onRemoveImageClick() {
    this.image = "";
    // todo : remove image from new chirp & delete saved
  }

  // Add image button
  onAddImageClick() {
    this.image = "assets/chirpImages/2.png";
    // todo : open file chooser, save image once chosen, add image to chirp
  }

  // Publish chirp button
  onPublishClick() {
    // todo : publish chirp & go to that chirp's page
  }
}
