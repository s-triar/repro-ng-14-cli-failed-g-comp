import { TestBed } from '@angular/core/testing';

import { GoodsTypeMockService } from './goods-type-mock.service';

describe('GoodsTypeMockService', () => {
  let service: GoodsTypeMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoodsTypeMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
