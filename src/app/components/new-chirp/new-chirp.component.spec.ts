import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChirpComponent } from './new-chirp.component';

describe('NewChirpComponent', () => {
  let component: NewChirpComponent;
  let fixture: ComponentFixture<NewChirpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewChirpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewChirpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
