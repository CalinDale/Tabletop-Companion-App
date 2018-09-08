import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;
  let testMessage: string;

  beforeEach(() => {
    service = new MessageService();
    testMessage = 'test: Happening';
  });
  afterEach(() => {
    service = null;
    testMessage = null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('add() should add message to messages', () => {
    service.add(testMessage);
    expect(service.messages.includes(testMessage)).toBeTruthy();
  });

  it('clear() should clear messages', () => {
    service.messages = [testMessage];
    service.clear();
    expect(service.messages.length).toBe(0);
  });
});
