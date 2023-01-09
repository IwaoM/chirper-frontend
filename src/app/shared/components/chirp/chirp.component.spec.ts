import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChirpComponent } from './chirp.component';

describe('ChirpComponent', () => {
  let component: ChirpComponent;
  let fixture: ComponentFixture<ChirpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChirpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChirpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
