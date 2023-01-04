import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
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
    private chirpsService: ChirpsService,
    private formBuilder: FormBuilder
  ) {}

  @Input() placeholderText!: string;
  @Input() replyToId!: number | null;
  @Output() newChirp = new EventEmitter<string>();

  connectedUser!: {
    id: number,
    username: string,
    pictureUrl$: Observable<SafeUrl>
  };

  newChirpForm!: FormGroup;
  newChirpFormData!: FormData;
  imagePreview!: string;

  ngOnInit () {
    this.connectedUser = {
      id: this.authService.getConnectedUserId(),
      username: this.authService.getConnectedUserUsername(),
      pictureUrl$: this.chirpsService.getUserProfilePic(this.authService.getConnectedUserId())
    };

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
  onConnectedUserClick () {
    // todo : open own profile page
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

    this.chirpsService.createChirp(this.newChirpFormData).subscribe();

    this.newChirpFormData.delete("chirpText");
    this.newChirpFormData.delete("timestamp");
    this.newChirpFormData.delete("authorId");
    this.newChirpFormData.delete("replyToId");
    this.newChirpFormData.delete("image");
    this.imagePreview = "";

    this.newChirp.emit();
    this.newChirpForm.reset();
  }
}
