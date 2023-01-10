import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTabsComponent } from './section-tabs.component';

describe('SectionTabsComponent', () => {
  let component: SectionTabsComponent;
  let fixture: ComponentFixture<SectionTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
