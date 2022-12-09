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
  starred!: boolean;
  deleteHovered!: boolean;
  starHovered!: boolean;
  answerHovered!: boolean;

  ngOnInit () {
    this.starred = false;
    this.deleteHovered = false;
    this.starHovered = false;
    this.answerHovered = false;
  }

  // Author pp, name or handle events
  onAuthorClick (event: Event) {
    event.stopPropagation();
    // todo : open author profile page
  }

  // Delete button events
  onDeleteMouseEnter () {
    this.deleteHovered = true;
  }

  onDeleteMouseLeave () {
    this.deleteHovered = false;
  }

  onDeleteClick (event: Event) {
    event.stopPropagation();
    // todo : delete the chirp (API)
  }

  // Star button events
  onStarMouseEnter () {
    this.starHovered = true;
  }

  onStarMouseLeave () {
    this.starHovered = false;
  }

  onStarClick (event: Event) {
    event.stopPropagation();
    this.starred = !this.starred;
    // this.chirpsService.starChirpById(this.chirp.id);
  }

  // Answer button events
  onAnswerMouseEnter () {
    this.answerHovered = true;
  }

  onAnswerMouseLeave () {
    this.answerHovered = false;
  }

  onAnswerClick (event: Event) {
    event.stopPropagation();
    // todo : open chirp page and focus on the answer field
  }
}
