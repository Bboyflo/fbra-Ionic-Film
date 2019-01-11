import { TestBed } from '@angular/core/testing';

import { FilmServiceService } from './film-service.service';

describe('FilmServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilmServiceService = TestBed.get(FilmServiceService);
    expect(service).toBeTruthy();
  });
});
