import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignMasterComponent } from './assign-master.component';

describe('AssignMasterComponent', () => {
  let component: AssignMasterComponent;
  let fixture: ComponentFixture<AssignMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
