import { TrackerComponent } from './tracker.component';

describe('TrackerComponent', () => {
  let component: TrackerComponent;
  beforeEach(() => {
    component = new TrackerComponent();
  });
  afterEach(() => {
    component = null;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
