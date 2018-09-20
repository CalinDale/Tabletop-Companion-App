import { TrackerComponent } from './tracker.component';
import { TrackerService } from '../tracker.service';

describe('TrackerComponent', () => {
  let testTrackerService: TrackerService;

  let component: TrackerComponent;

  beforeEach(() => {

    component = new TrackerComponent(testTrackerService);
  });
  afterEach(() => {
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
