import { TestBed } from '@angular/core/testing';

import { DbFavorisService } from './db-favoris.service';

describe('DbFavorisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbFavorisService = TestBed.get(DbFavorisService);
    expect(service).toBeTruthy();
  });
});
