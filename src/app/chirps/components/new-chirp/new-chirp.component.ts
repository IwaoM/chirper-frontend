import { Component, Input, OnInit } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { ChirpsService } from "src/app/core/services/chirps.service";

@Component({
  selector: "app-new-chirp",
  templateUrl: "./new-chirp.component.html",
  styleUrls: ["./new-chirp.component.scss"]
})
export class NewChirpComponent implements OnInit {
  constructor (
    private authService: AuthService,
    private chirpsService: ChirpsService
  ) {}

  @Input() placeholderText!: string;
  connectedUser!: {
    id: number,
    username: string,
    pictureUrl$: Observable<SafeUrl>
  };
  image!: string;

  ngOnInit () {
    this.connectedUser = {
      id: this.authService.getConnectedUserId(),
      username: this.authService.getConnectedUserUsername(),
      pictureUrl$: this.chirpsService.getUserProfilePic(this.authService.getConnectedUserId())
    };
    this.image = "";
  }

  // Connected user pp (next to the new tweet / new answer field)
  onConnectedUserClick () {
    // todo : open own profile page
  }

  // Remove image button
  onRemoveImageClick () {
    this.image = "";
    // todo : remove image from new chirp & delete saved
  }

  // Add image button
  onAddImageClick () {
    this.image = "assets/chirpImages/2.png";
    // todo : open file chooser, save image once chosen, add image to chirp
  }

  // Publish chirp button
  onPublishClick () {
    // todo : publish chirp & go to that chirp"s page
  }
}
