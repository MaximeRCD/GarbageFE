import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanPhotoComponent } from './scan-photo.component';

describe('ScanPhotoComponent', () => {
  let component: ScanPhotoComponent;
  let fixture: ComponentFixture<ScanPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
