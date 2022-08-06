import { TestBed } from '@angular/core/testing';

import { RedemptionService } from './redemption.service';

describe('RedemptionService', () => {
  let service: RedemptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedemptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
