import { AttributeService } from './attribute.service';
import { CharacterService } from './character.service';
import { TrackerService } from './tracker.service';
import { Attribute } from './attribute';

describe('Service: Tracker', () => {

  let testCharacterService: CharacterService;
  let testAttributeService: AttributeService;

  let service: TrackerService;
  beforeEach(() => {

    testCharacterService = jasmine.createSpyObj('testCharacterService', [
      'getCharactersTracker',
      'trackCharacter',
      'untrackCharacter'
    ]);
    testAttributeService = jasmine.createSpyObj('testAttributeService', [
      'getAttributes',
      'trackAttribute',
      'untrackAttribute'
    ]);
    // TODO: Set up returns to return angularfirelists when we know how to.

    service = new TrackerService(testCharacterService, testAttributeService);
  });
  afterEach(() => {
    testCharacterService = null;
    testAttributeService = null;
    service = null;
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  // TODO: Test constructor somehow.

  // TODO: Test getCharacters when mock observables are set up.

  // TODO: test getAttributes when mock observables are set up.

  describe('prepareAttributeColumns()', () => {
    let testNumAttributeColumns: number;
    let testAttributeColumns: Attribute[];
    beforeEach(() => {
      testNumAttributeColumns = 3;
      testAttributeColumns = [];

      service.numAttributeColumns = testNumAttributeColumns;
      service.attributeColumns = testAttributeColumns;
    });
    afterEach(() => {
      testNumAttributeColumns = null;
      testAttributeColumns = null;
      service.numAttributeColumns = null;
      service.attributeColumns = null;
    });
    it('should create as many attributes in AttributeColumns as numAttributeColumns', () => {
      service.prepareAttributeColumns();
      expect(service.attributeColumns.length).toBe(3);
    });
  });
});
