import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-page-search",
  templateUrl: "./page-search.component.html",
  styleUrls: ["./page-search.component.scss"]
})
export class PageSearchComponent implements OnInit {

  searchTabs = [
    { title: "Chirps" },
    { title: "Utilisateurs" },
  ];
  selectedSearchTabIndex!: number;

  ngOnInit () {
    this.selectedSearchTabIndex = 0;
  }

  onTabClick (index: number) {
    this.selectedSearchTabIndex = index;
  }

}
