import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-search-form",
  templateUrl: "./search-form.component.html",
  styleUrls: ["./search-form.component.scss"]
})
export class SearchFormComponent implements OnInit {
  constructor (
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  searchBar!: FormGroup;
  @Output() textSearched = new EventEmitter<string>();

  ngOnInit (): void {
    this.initForm();
  }

  initForm () {
    this.searchBar = this.formBuilder.group({
      searchText: new FormControl("", [
        Validators.maxLength(40)
      ])
    });
  }

  onSearchButton () {
    this.textSearched.emit(this.searchBar.value.searchText);
  }
}
