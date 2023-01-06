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

  @Input() viewType!: "normal" | "focused";
  @Input() chirp!: Chirp;
  @Input() chirpsStarredByConnectedUser!: number[];
  @Output() deleteChirp = new EventEmitter<null>();

  authorProfilePicUrl$!: Observable<SafeUrl>;
  chirpImageUrl$?: Observable<SafeUrl>;
  repliedToChirp$?: Observable<Chirp>;
  starred!: boolean;

  localStarcount!: number;
  localStarred!: boolean;

  connectedUser!: {
    id: number
  };

  deleteHovered!: boolean;
  starHovered!: boolean;
  answerHovered!: boolean;

  ngOnInit () {
    this.starred = this.chirpsStarredByConnectedUser.includes(this.chirp.id);
    this.localStarred = this.starred;

    this.connectedUser = {
      id: this.authService.getConnectedUserId()
    };

    this.localStarcount = this.chirp.star_count;

    if (this.chirp.reply_to_id) {
      this.repliedToChirp$ = this.chirpsService.getChirpById(this.chirp.reply_to_id);
    }

    this.authorProfilePicUrl$ = this.chirpsService.getUserProfilePic(this.chirp.author_id);
    if (this.chirp.image) {
      this.chirpImageUrl$ = this.chirpsService.getChirpImage(this.chirp.id);
    }

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
    // todo: navigate to replied chirp author profile page
  }

  // Author pp, name or handle events
  onAuthorClick (event: Event) {
    event.stopPropagation();
    // todo: open author profile page
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
    // update displayed values without reloading the whole list
    this.localStarred = !this.localStarred;
    this.localStarred ? this.localStarcount++ : this.localStarcount--;
    this.chirpsService.starChirpById(this.chirp.id, this.connectedUser.id, this.localStarred).subscribe();
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
    this.router.navigateByUrl(`app/chirps/${this.chirp.id}?action=reply`);
  }
}
