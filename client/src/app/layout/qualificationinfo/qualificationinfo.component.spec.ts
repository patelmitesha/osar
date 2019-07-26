import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationinfoComponent } from './qualificationinfo.component';

describe('QualificationinfoComponent', () => {
  let component: QualificationinfoComponent;
  let fixture: ComponentFixture<QualificationinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificationinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
