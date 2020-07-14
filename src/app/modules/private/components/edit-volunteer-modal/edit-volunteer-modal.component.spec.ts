import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVolunteerModalComponent } from './edit-volunteer-modal.component';

describe('EditVolunteerModalComponent', () => {
  let component: EditVolunteerModalComponent;
  let fixture: ComponentFixture<EditVolunteerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVolunteerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVolunteerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
