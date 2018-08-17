import { TestBed, inject } from '@angular/core/testing';

import { TurnOrderService } from './turn-order.service';

describe('TurnOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TurnOrderService]
    });
  });

  it('should be created', inject([TurnOrderService], (service: TurnOrderService) => {
    expect(service).toBeTruthy();
  }));
});
