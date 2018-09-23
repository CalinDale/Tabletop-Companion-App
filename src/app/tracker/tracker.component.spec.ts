import { Character } from '../character';
import { of } from 'rxjs';
import { TrackerComponent } from './tracker.component';
import { TrackerService } from '../tracker.service';
import { Attribute } from '../attribute';

describe('TrackerComponent', () => {
  let testCharacters: Character[];
  let testAttributeColumns: Attribute[];
  let testCurrentActor: number;

  let testTrackerService: TrackerService;

  let component: TrackerComponent;

  beforeEach(() => {
    testCharacters = [
      <any>{key: 0},
      <any>{key: 1},
      <any>{key: 2}
    ];
    testAttributeColumns = [];
    testCurrentActor = 0;

    testTrackerService = jasmine.createSpyObj('testTrackerService', [
      'getCharacters',
      'getAttributeColumns',
      'getCurrentActor',
      'nextTurn',
      'prevTurn'
    ]);
    (<jasmine.Spy>(testTrackerService.getCharacters)).and.returnValue(of(testCharacters));
    (<jasmine.Spy>(testTrackerService.getAttributeColumns)).and.returnValue(of(testAttributeColumns));
    (<jasmine.Spy>(testTrackerService.getCurrentActor)).and.returnValue(of(testCurrentActor));

    component = new TrackerComponent(testTrackerService);
  });
  afterEach(() => {
    testCharacters = null;
    testAttributeColumns = null;
    testCurrentActor = null;
    testTrackerService = null;
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should get characters from trackerService.getCharacters()', () => {
      component.ngOnInit();
      expect(component.characters).toBe(testCharacters);
    });
    it('should get attributeColumns from trackerService.getAttributeColumns()', () => {
      component.ngOnInit();
      expect(component.attributeColumns).toBe(testAttributeColumns);
    });
    it('should get currentActor from trackerService.getCurrentActor()', () => {
      component.ngOnInit();
      expect(component.currentActor).toBe(testCurrentActor);
    });
  });

  describe('nextTurn()', () => {
    it('should call trackerService.nextTurn()', () => {
      component.nextTurn();
      expect(testTrackerService.nextTurn).toHaveBeenCalled();
    });
    it('should get currentActor from trackerService.getCurrentActor()', () => {
      component.nextTurn();
      expect(component.currentActor).toBe(testCurrentActor);
    });
  });

  describe('prevTurn()', () => {
    it('should call trackerService.prevTurn()', () => {
      component.prevTurn();
      expect(testTrackerService.prevTurn).toHaveBeenCalled();
    });
    it('should get currentActor from trackerService.getCurrentActor()', () => {
      component.prevTurn();
      expect(component.currentActor).toBe(testCurrentActor);
    });
  });
});
