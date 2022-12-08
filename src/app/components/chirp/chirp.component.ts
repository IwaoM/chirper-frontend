import { Component, Input } from '@angular/core';
import { ChirpsService } from 'src/app/services/chirps.service';
import { Chirp } from '../../models/chirp.model';

@Component({
  selector: 'app-chirp',
  templateUrl: './chirp.component.html',
  styleUrls: ['./chirp.component.scss']
})
export class ChirpComponent {
  constructor(private chirpsService: ChirpsService) {}

  @Input() chirp!: Chirp;
  deleteHovered!: boolean;
  starHovered!: boolean;
  answerHovered!: boolean;

  ngOnInit() {
    this.deleteHovered = false;
    this.starHovered = false;
    this.answerHovered = false;
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
    // todo : service method to delete the chirp
  }

  // Star button events
  onStarMouseEnter() {
    this.starHovered = true;
  }

  onStarMouseLeave() {
    this.starHovered = false;
  }

  onStarClick() {
    this.chirpsService.starChirpById(this.chirp.id);
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
