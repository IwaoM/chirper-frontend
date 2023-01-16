import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SafeUrl } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { User } from "src/app/core/models/user.model";
import { AuthService } from "src/app/core/services/auth.service";
import { UsersService } from "src/app/core/services/users.service";
import { ValidatorsService } from "src/app/core/services/validators.service";

@Component({
  selector: "app-page-settings",
  templateUrl: "./page-settings.component.html",
  styleUrls: ["./page-settings.component.scss"]
})
export class PageSettingsComponent implements OnInit {

  constructor (
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    private validatorsService: ValidatorsService,
    private route: ActivatedRoute,
  ) {}

  userId!: number;
  connectedUser!: { id: number };

  user$!: Observable<User>;
  profilePictureUrl$!: Observable<SafeUrl>;
  profilePicturePreview!: string | SafeUrl;

  profileForm!: FormGroup;
  profileFormData!: FormData;

  settingsTabs = [
    { title: "Profil" },
    { title: "Mot de passe" },
    { title: "Thème" },
    { title: "Compte" },
  ];
  selectedSettingsTabIndex = 0;

  ngOnInit () {
    this.onNavigationToSettingsPage();
  }

  onNavigationToSettingsPage () {
    this.userId = +this.route.snapshot.params["id"];
    this.connectedUser = { id: this.authService.getConnectedUserId() };
    if (this.userId !== this.connectedUser.id) {
      this.router.navigateByUrl(`app/users/${this.connectedUser.id}`);
      return;
    }

    this.initForms();

    this.user$ = this.usersService.getUserById(this.userId).pipe(
      tap(user => {
        this.profileForm.get("email")?.setValue(user.email);
        this.profileForm.get("handle")?.setValue(user.handle);
        this.profileForm.get("username")?.setValue(user.username);
        this.profileForm.get("bio")?.setValue(user.bio);
        this.profileForm.updateValueAndValidity();
      })
    );
    this.user$.subscribe();
    this.profilePictureUrl$ = this.usersService.getUserProfilePic(this.userId).pipe(
      tap(url => this.profilePicturePreview = url)
    );
    this.profilePictureUrl$.subscribe();
  }

  private initForms (): void {
    // Profile update form
    this.profileFormData = new FormData();
    this.profileFormData.append("keepOldProfilePic", "true");

    this.profileForm = this.formBuilder.group({
      email: new FormControl("", [
        Validators.required,
        Validators.email,
      ], [
        this.validatorsService.uniqueEmailValidator()
      ]),
      handle: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.pattern("^[a-zA-Z0-9_-]{1,15}$"),
      ], [
        this.validatorsService.uniqueHandleValidator()
      ]),
      username: new FormControl("", [
        Validators.maxLength(40)
      ]),
      bio: new FormControl("", [
        Validators.maxLength(120)
      ]),
    });
  }

  onTabClick (index: number) {
    this.selectedSettingsTabIndex = index;
  }

  onUpdateButton () {
    for (const field in this.profileForm.value) {
      this.profileFormData.append(field, this.profileForm.value[field]);
    }
    this.usersService.updateProfile(this.connectedUser.id, this.profileFormData).pipe(
      tap(() => this.onNavigationToSettingsPage())
    ).subscribe();

    this.profileFormData.delete("email");
    this.profileFormData.delete("handle");
    this.profileFormData.delete("username");
    this.profileFormData.delete("bio");
    this.profileFormData.delete("keepOldProfilePic");
  }

  onProfilePicSelect (event: any) {
    if (event?.target?.files[0]) {
      this.profileFormData.delete("keepOldProfilePic");
      const file: File = event.target.files[0];

      // add picture to formData
      this.profileFormData.delete("profilePic");
      this.profileFormData.append("profilePic", file, "profilePic.png");

      // update the src for the preview image
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicturePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onProfilePicRemove () {
    this.profilePicturePreview = "";
    this.profileFormData.delete("keepOldProfilePic");
    if (this.profileFormData.has("profilePic")) {
      this.profileFormData.delete("profilePic");
    }
  }

  //* Error messages
  getFormControlErrorText (ctrl: AbstractControl | null): string {
    if (ctrl?.hasError("required")) {
      return "Ce champ est requis";
    } else if (ctrl?.hasError("minlength")) {
      return "La valeur rentrée n'est pas assez longue";
    } else if (ctrl?.hasError("maxlength")) {
      return "La valeur rentrée est trop longue";
    } else if (ctrl?.hasError("email")) {
      return "La valeur rentrée n'est pas une adresse mail valide";
    } else if (ctrl?.hasError("pattern")) {
      return "La valeur rentrée contient des caractères invalides";
    } else if (ctrl?.hasError("emailAlreadyInUse")) {
      return "Cette adresse email est déjà utilisée";
    } else if (ctrl?.hasError("handleAlreadyInUse")) {
      return "Ce nom d'utilisateur est déjà utilisé";
    } else {
      return "";
    }
  }
}
