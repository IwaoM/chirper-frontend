import { Component } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { User } from "src/app/core/models/user.model";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-page-settings",
  templateUrl: "./page-settings.component.html",
  styleUrls: ["./page-settings.component.scss"]
})
export class PageSettingsComponent {

  constructor (
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.connectedUser = this.authService.getConnectedUser();
        this.selectedSettingsTabIndex = +this.route.snapshot.queryParams["tab"];
      }
    });
  }

  connectedUser!: User;

  settingsTabs = [
    { title: "Profil" },
    { title: "Mot de passe" },
    { title: "Thème" },
    { title: "Compte" },
  ];
  selectedSettingsTabIndex!: number;

  onTabClick (index: number) {
    this.router.navigateByUrl(`/users/${this.connectedUser.id}/settings?tab=${index}`);
  }
}
