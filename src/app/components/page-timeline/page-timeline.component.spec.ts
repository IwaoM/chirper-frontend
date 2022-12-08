import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTimelineComponent } from './page-timeline.component';

describe('PageTimelineComponent', () => {
  let component: PageTimelineComponent;
  let fixture: ComponentFixture<PageTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTimelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
