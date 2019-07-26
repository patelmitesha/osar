import { TestBed, inject } from '@angular/core/testing';

import { CourseconfigService } from './courseconfig.service';

describe('CourseconfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseconfigService]
    });
  });

  it('should be created', inject([CourseconfigService], (service: CourseconfigService) => {
    expect(service).toBeTruthy();
  }));
});
