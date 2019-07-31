import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterwisemarksComponent } from './semesterwisemarks.component';

describe('SemesterwisemarksComponent', () => {
  let component: SemesterwisemarksComponent;
  let fixture: ComponentFixture<SemesterwisemarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemesterwisemarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterwisemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
