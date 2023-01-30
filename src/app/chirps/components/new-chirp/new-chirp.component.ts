import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SafeUrl } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Observable, take, tap } from "rxjs";
import { User } from "src/app/core/models/user.model";
import { AuthService } from "src/app/core/services/auth.service";
import { ChirpsService } from "src/app/core/services/chirps.service";
import { UsersService } from "src/app/core/services/users.service";

@Component({
  selector: "app-new-chirp",
  templateUrl: "./new-chirp.component.html",
  styleUrls: ["./new-chirp.component.scss"]
})
export class NewChirpComponent implements OnInit {
  constructor (
    private authService: AuthService,
    private chirpsService: ChirpsService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  @Input() placeholderText!: string;
  @Input() replyToId!: number | null;
  @Output() newChirp = new EventEmitter<null>();

  connectedUser!: User;
  pictureUrl$!: Observable<SafeUrl>;

  newChirpForm!: FormGroup;
  newChirpFormData!: FormData;
  imagePreview!: string;

  ngOnInit () {
    this.connectedUser = this.authService.getConnectedUser();
    this.pictureUrl$ = this.usersService.getUserProfilePic(this.connectedUser.id, this.connectedUser.pic_updated);

    this.newChirpForm = this.formBuilder.group({
      chirpText: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(400)
      ])
    });

    this.newChirpFormData = new FormData();
    this.imagePreview = "";
  }

  // Connected user pp (next to the new tweet / new answer field)
  onConnectedUserClick (event: Event) {
    event.stopPropagation();
    this.router.navigateByUrl(`users/${this.connectedUser.id}?tab=0`);
  }

  // Remove image button
  onRemoveImageClick () {
    this.newChirpFormData.delete("image");
    this.imagePreview = "";
  }

  // Add image button
  onImageSelect (event: any) {
    if (event?.target?.files[0]) {
      const file: File = event.target.files[0];

      // add picture to formData
      if (this.newChirpFormData.has("image")) {
        this.newChirpFormData.delete("image");
      }
      this.newChirpFormData.append("image", file, "image.png");

      // update the src for the preview image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Publish chirp button
  onPublishClick () {
    for (const field in this.newChirpForm.value) {
      this.newChirpFormData.append(field, this.newChirpForm.value[field]);
    }
    this.newChirpFormData.append("timestamp", new Date().toISOString().split(".")[0]);
    this.newChirpFormData.append("authorId", this.connectedUser.id.toString());
    this.newChirpFormData.append("replyToId", this.replyToId?.toString() || "");

    this.chirpsService.createChirp(this.newChirpFormData).pipe(
      tap(() => this.newChirp.emit()),
      take(1)
    ).subscribe();

    this.newChirpFormData.delete("chirpText");
    this.newChirpFormData.delete("timestamp");
    this.newChirpFormData.delete("authorId");
    this.newChirpFormData.delete("replyToId");
    this.newChirpFormData.delete("image");
    this.imagePreview = "";

    this.newChirpForm.reset();
  }
}
