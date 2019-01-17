import { TestBed } from '@angular/core/testing';

import { ApiOMDbService } from './api-omdb.service';

describe('ApiOMDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiOMDbService = TestBed.get(ApiOMDbService);
    expect(service).toBeTruthy();
  });
});
