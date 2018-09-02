import { TurnOrderService } from './turn-order.service';

describe('TurnOrderService', () => {
  let service: TurnOrderService;
  beforeEach(() => {
    service = new TurnOrderService();
  });
  afterEach(() => {
    service = null;
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
