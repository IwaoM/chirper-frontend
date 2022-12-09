import { Component, Input, OnInit } from "@angular/core";
import { Chirp } from "src/app/models/chirp.model";
import { ChirpsService } from "src/app/services/chirps.service";

@Component({
  selector: "app-focused-chirp",
  templateUrl: "./focused-chirp.component.html",
  styleUrls: ["./focused-chirp.component.scss"]
})
export class FocusedChirpComponent implements OnInit {
  constructor (private chirpsService: ChirpsService) {}

  @Input() chirp!: Chirp;
  deleteHovered!: boolean;
  starHovered!: boolean;
  answerHovered!: boolean;

  ngOnInit () {
    this.deleteHovered = false;
    this.starHovered = false;
    this.answerHovered = false;
  }

  // Author pp, name or handle events
  onAuthorClick () {
    // todo : open author profile page
  }

  // Delete button events
  onDeleteMouseEnter () {
    this.deleteHovered = true;
  }

  onDeleteMouseLeave () {
    this.deleteHovered = false;
  }

  onDeleteClick () {
    // todo : delete the chirp (API)
  }

  // Star button events
  onStarMouseEnter () {
    this.starHovered = true;
  }

  onStarMouseLeave () {
    this.starHovered = false;
  }

  onStarClick () {
    this.chirpsService.starChirpById(this.chirp.id);
  }

  // Answer button events
  onAnswerMouseEnter () {
    this.answerHovered = true;
  }

  onAnswerMouseLeave () {
    this.answerHovered = false;
  }

  onAnswerClick () {
    // todo : open chirp page and focus on the answer field
  }
}
