import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { take, tap } from "rxjs";
import { User } from "src/app/core/models/user.model";
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

  @Input() viewType!: "normal" | "focused";
  @Input() chirp!: Chirp;
  @Input() starred!: boolean;
  @Input() repliedToChirp!: Chirp | null;
  @Input() authorProfilePicUrl!: SafeUrl | null;
  @Input() chirpImageUrl!: SafeUrl | null;
  @Output() deleteChirp = new EventEmitter<null>();
  @Output() starChirp = new EventEmitter<null>();

  connectedUser!: User;

  deleteHovered!: boolean;
  starHovered!: boolean;
  answerHovered!: boolean;

  ngOnInit () {
    this.connectedUser = this.authService.getConnectedUser();

    this.deleteHovered = false;
    this.starHovered = false;
    this.answerHovered = false;
  }

  // Chirp box events
  onChirpClick () {
    this.router.navigateByUrl(`app/chirps/${this.chirp.id}`);
  }

  onRepliedToChirpClick (event: Event) {
    event.stopPropagation();
    this.router.navigateByUrl(`app/chirps/${this.chirp.reply_to_id}`);
  }

  onRepliedToAuthorClick (event: Event) {
    event.stopPropagation();
    this.router.navigateByUrl(`users/${this.repliedToChirp?.author_id}?tab=0`);
  }

  // Author pp, name or handle events
  onAuthorClick (event: Event) {
    event.stopPropagation();
    this.router.navigateByUrl(`users/${this.chirp.author_id}?tab=0`);
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
      tap(() => this.deleteChirp.emit()),
      take(1)
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
    // update displayed values without reloading the whole list
    this.starred = !this.starred;
    this.starred ? this.chirp.star_count++ : this.chirp.star_count--;
    this.chirpsService.starChirpById(this.chirp.id, this.connectedUser.id, this.starred).pipe(
      tap(() => this.starChirp.emit()),
      take(1)
    ).subscribe();
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
    if (this.viewType === "normal") {
      this.router.navigateByUrl(`app/chirps/${this.chirp.id}?action=reply`);
    } else {
      document.getElementById("chirpTextArea")?.focus();
    }
  }
}
