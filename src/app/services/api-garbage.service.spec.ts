import { TestBed } from '@angular/core/testing';

import { ApiGarbageService } from './api-garbage.service';

describe('ApiGarbageService', () => {
  let service: ApiGarbageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGarbageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
