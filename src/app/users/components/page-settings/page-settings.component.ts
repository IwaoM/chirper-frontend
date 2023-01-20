import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "src/app/core/models/user.model";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-page-settings",
  templateUrl: "./page-settings.component.html",
  styleUrls: ["./page-settings.component.scss"]
})
export class PageSettingsComponent implements OnInit {

  constructor (
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  userId!: number;
  connectedUser!: User;

  settingsTabs = [
    { title: "Profil" },
    { title: "Mot de passe" },
    { title: "Thème" },
    { title: "Compte" },
  ];
  selectedSettingsTabIndex = 0;

  ngOnInit () {
    this.userId = +this.route.snapshot.params["id"];
    this.connectedUser = this.authService.getConnectedUser();
    if (this.userId !== this.connectedUser.id) {
      this.router.navigateByUrl(`app/users/${this.connectedUser.id}`);
    }
  }

  onTabClick (index: number) {
    this.selectedSettingsTabIndex = index;
  }
}
