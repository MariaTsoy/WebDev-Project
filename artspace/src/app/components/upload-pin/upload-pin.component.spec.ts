import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPinComponent } from './upload-pin.component';

describe('UploadPinComponent', () => {
  let component: UploadPinComponent;
  let fixture: ComponentFixture<UploadPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadPinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
