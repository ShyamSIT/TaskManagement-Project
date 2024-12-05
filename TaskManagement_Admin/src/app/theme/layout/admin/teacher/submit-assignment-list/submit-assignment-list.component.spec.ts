import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitAssignmentListComponent } from './submit-assignment-list.component';

describe('SubmitAssignmentListComponent', () => {
  let component: SubmitAssignmentListComponent;
  let fixture: ComponentFixture<SubmitAssignmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitAssignmentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitAssignmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
