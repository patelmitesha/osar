import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitapplicationComponent } from './submitapplication.component';

describe('SubmitapplicationComponent', () => {
  let component: SubmitapplicationComponent;
  let fixture: ComponentFixture<SubmitapplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitapplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
