import { Component, OnInit } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "src/app/core/models/user.model";
import { AuthService } from "src/app/core/services/auth.service";
import { UsersService } from "src/app/core/services/users.service";

@Component({
  selector: "app-page-profile",
  templateUrl: "./page-profile.component.html",
  styleUrls: ["./page-profile.component.scss"]
})
export class PageProfileComponent implements OnInit {
  constructor (
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService,
    private route: ActivatedRoute,
  ) {
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.onNavigationToProfilePage();
      }
    });
  }

  pageType!: "profile" | "ownProfile";
  userId!: number;
  connectedUser!: { id: number };

  user$!: Observable<User>;
  profilePictureUrl$!: Observable<SafeUrl>;

  ngOnInit () {
    this.onNavigationToProfilePage();
  }

  onNavigationToProfilePage () {
    this.userId = +this.route.snapshot.params["id"];
    this.connectedUser = { id: this.authService.getConnectedUserId() };
    this.pageType = this.userId === this.connectedUser.id ? "ownProfile" : "profile";

    this.user$ = this.usersService.getUserById(this.userId);
    this.profilePictureUrl$ = this.usersService.getUserProfilePic(this.userId);
  }
}
