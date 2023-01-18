import { Component, OnInit } from "@angular/core";
import { Observable, tap } from "rxjs";
import { User } from "src/app/core/models/user.model";
import { AuthService } from "src/app/core/services/auth.service";
import { UsersService } from "src/app/core/services/users.service";

@Component({
  selector: "app-theme-selector",
  templateUrl: "./theme-selector.component.html",
  styleUrls: ["./theme-selector.component.scss"]
})
export class ThemeSelectorComponent implements OnInit {
  constructor (
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  connectedUser!: { id: number };

  user$!: Observable<User>;

  selectedBackground!: number;
  selectedAccent!: number;

  ngOnInit () {
    this.initPage();
  }

  initPage () {
    this.connectedUser = { id: this.authService.getConnectedUserId() };
    this.getUserData();
  }

  private getUserData () {
    this.user$ = this.usersService.getUserById(this.connectedUser.id).pipe(
      tap(user => {
        this.selectedBackground = user.theme_bg;
        this.selectedAccent = user.theme_accent;
      })
    );
    this.user$.subscribe();
  }

  selectThemeBackground (background: number) {
    if (this.selectedBackground >= 0) {
      this.selectedBackground = background;
    }
  }

  selectThemeAccent (accent: number) {
    if (this.selectedAccent >= 0) {
      this.selectedAccent = accent;
    }
  }
}
