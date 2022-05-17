import { TestBed } from '@angular/core/testing';

import { GoodsTypeStoreService } from './goods-type-store.service';

describe('GoodsTypeStoreService', () => {
  let service: GoodsTypeStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoodsTypeStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
