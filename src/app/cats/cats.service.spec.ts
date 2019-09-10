import { TestBed } from '@angular/core/testing';

import { CatsService } from './cats.service';

describe('CatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatsService = TestBed.get(CatsService);
    expect(service).toBeTruthy();
  });
});
