import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-section-tabs",
  templateUrl: "./section-tabs.component.html",
  styleUrls: ["./section-tabs.component.scss"]
})
export class SectionTabsComponent {

  @Input() tabs!: { title: string }[];
  @Input() selectedTabIndex!: number;
  @Output() tabClicked = new EventEmitter<number>();

  onTabClick (index: number) {
    this.tabClicked.emit(index);
  }
}
