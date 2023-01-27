import { Component, Input } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { User } from "src/app/core/models/user.model";

@Component({
  selector: "app-user-card",
  templateUrl: "./user-card.component.html",
  styleUrls: ["./user-card.component.scss"]
})
export class UserCardComponent {
  constructor (
    private router: Router
  ) {}

  @Input() user!: User;
  @Input() profilePicUrl!: SafeUrl | null;
  @Input() viewType!: "normal" | "focused";

  onUserClick (event: Event) {
    if (this.viewType === "normal") {
      event.stopPropagation();
      this.router.navigateByUrl(`users/${this.user.id}?tab=0`);
    }
  }
}
