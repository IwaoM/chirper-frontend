import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusedChirpComponent } from './focused-chirp.component';

describe('FocusedChirpComponent', () => {
  let component: FocusedChirpComponent;
  let fixture: ComponentFixture<FocusedChirpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FocusedChirpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FocusedChirpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
