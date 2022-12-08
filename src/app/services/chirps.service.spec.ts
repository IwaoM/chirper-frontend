import { TestBed } from '@angular/core/testing';

import { ChirpsService } from './chirps.service';

describe('ChirpsService', () => {
  let service: ChirpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChirpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
