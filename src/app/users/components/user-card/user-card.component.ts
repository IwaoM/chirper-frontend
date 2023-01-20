import { Component, Input } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { User } from "src/app/core/models/user.model";

@Component({
  selector: "app-user-card",
  templateUrl: "./user-card.component.html",
  styleUrls: ["./user-card.component.scss"]
})
export class UserCardComponent {
  @Input() user!: User;
  @Input() profilePicUrl!: SafeUrl | null;
}
