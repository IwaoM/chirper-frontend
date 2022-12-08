import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageChirpComponent } from './page-chirp.component';

describe('PageChirpComponent', () => {
  let component: PageChirpComponent;
  let fixture: ComponentFixture<PageChirpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageChirpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageChirpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
