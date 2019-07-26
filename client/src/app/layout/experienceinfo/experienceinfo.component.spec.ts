import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceinfoComponent } from './experienceinfo.component';

describe('ExperienceinfoComponent', () => {
  let component: ExperienceinfoComponent;
  let fixture: ComponentFixture<ExperienceinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
