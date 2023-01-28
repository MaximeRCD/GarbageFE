import { TestBed } from '@angular/core/testing';

import { UserStatistiqueService } from './user-statistique.service';

describe('UserStatistiqueService', () => {
  let service: UserStatistiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserStatistiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
