import { TrackerService } from './../tracker.service';
import { TrackerRowComponent } from './tracker-row.component';
import { AttributeService } from '../attribute.service';

describe('TrackerRowComponent', () => {
  let testAttributeService: AttributeService;
  let testTrackerService: TrackerService;
  let component: TrackerRowComponent;

  beforeEach(() => {
    component = new TrackerRowComponent(testAttributeService, testTrackerService);
  });
  afterEach(() => {
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
