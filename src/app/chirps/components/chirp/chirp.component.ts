import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ChirpsService } from "src/app/core/services/chirps.service";
import { Chirp } from "../../../core/models/chirp.model";

@Component({
  selector: "app-chirp",
  templateUrl: "./chirp.component.html",
  styleUrls: ["./chirp.component.scss"]
})
export class ChirpComponent implements OnInit {
  constructor (
    private chirpsService: ChirpsService,
    private router: Router
  ) {}

  @Input() chirp!: Chirp;
  @Input() viewType!: "normal" | "focused";
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

  // Chirp box events
  onChirpClick () {
    this.router.navigateByUrl(`app/chirps/${this.chirp.id}`);
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
    // todo : service method to delete the chirp
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
