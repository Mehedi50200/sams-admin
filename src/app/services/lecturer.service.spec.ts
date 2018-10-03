import { TestBed } from '@angular/core/testing';

import { LecturerService } from './lecturer.service';

describe('LecturerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LecturerService = TestBed.get(LecturerService);
    expect(service).toBeTruthy();
  });
});
