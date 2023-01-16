import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordUpdateFormComponent } from './password-update-form.component';

describe('PasswordUpdateFormComponent', () => {
  let component: PasswordUpdateFormComponent;
  let fixture: ComponentFixture<PasswordUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordUpdateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
