import { TestBed } from '@angular/core/testing';

import { StudentService } from './student.service';

describe('StudentserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentService = TestBed.get(StudentService);
    expect(service).toBeTruthy();
  });
});
