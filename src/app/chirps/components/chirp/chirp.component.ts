import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { ChirpsService } from "src/app/core/services/chirps.service";
import { Chirp } from "../../../core/models/chirp.model";


@Component({
  selector: "app-chirp",
  templateUrl: "./chirp.component.html",
  styleUrls: ["./chirp.component.scss"]
})
export class ChirpComponent implements OnInit {
  constructor (
    private authService: AuthService,
    private chirpsService: ChirpsService,
    private router: Router
  ) {}

  @Input() chirp!: Chirp;
  @Input() viewType!: "normal" | "focused";
  @Output() deleteChirp = new EventEmitter<null>();

  authorProfilePicUrl$!: Observable<SafeUrl>;
  chirpImageUrl$?: Observable<SafeUrl>;

  connectedUser!: {
    id: number
  };

  starred!: boolean;
  deleteHovered!: boolean;
  starHovered!: boolean;
  answerHovered!: boolean;

  ngOnInit () {
    this.authorProfilePicUrl$ = this.chirpsService.getUserProfilePic(this.chirp.author_id);
    if (this.chirp.image) {
      this.chirpImageUrl$ = this.chirpsService.getChirpImage(this.chirp.id);
    }

    this.connectedUser = {
      id: this.authService.getConnectedUserId()
    };

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
    this.chirpsService.deleteChirp(this.chirp.id).pipe(
      tap(() => this.deleteChirp.emit())
    ).subscribe();
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
