import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrImageComponent } from './ocr-image.component';

describe('OcrImageComponent', () => {
  let component: OcrImageComponent;
  let fixture: ComponentFixture<OcrImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcrImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OcrImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
