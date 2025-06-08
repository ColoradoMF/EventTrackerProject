import { TestBed } from '@angular/core/testing';

import { ItemToBuyService } from './item-service';

describe('ItemToBuyService', () => {
  let service: ItemToBuyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemToBuyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
