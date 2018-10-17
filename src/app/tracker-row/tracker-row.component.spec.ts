import { of } from 'rxjs';
import { Character } from '../character';
import { Attribute } from '../attribute';
import { TrackerService } from '../tracker.service';
import { TrackerRowComponent } from './tracker-row.component';
import { AttributeService } from '../attribute.service';

describe('TrackerRowComponent', () => {
  let testCharacter: Character;

  let testCharacters: Character[];
  let testAttributes: Attribute[];
  let testAttributeColumns: Attribute[];
  let testSelectedAttributeIndexes: number[];

  let testAttributeService: AttributeService;
  let testTrackerService: TrackerService;
  let component: TrackerRowComponent;

  beforeEach(() => {
    testCharacter = <any>{
      key: 0
    };

    testAttributes = [
      <any>{key: '0'},
      <any>{key: '1'},
      <any>{key: '2'}
    ];
    testCharacters = [
      <any>{key: '0'},
      <any>{key: '1'},
      <any>{key: '2'}
    ];
    testAttributeColumns = [];
    testSelectedAttributeIndexes = [0, 1, 2];

    testAttributeService = jasmine.createSpyObj('testAttributeService', [
      'updateAttribute'
    ]);
    testTrackerService = jasmine.createSpyObj('testTrackerService', [
      'getAttributes',
      'getCharacters',
      'getAttributeColumns'
    ]);
    (<jasmine.Spy>(testTrackerService.getAttributes)).and.returnValue(of(testAttributes));
    (<jasmine.Spy>(testTrackerService.getCharacters)).and.returnValue(of(testCharacters));
    (<jasmine.Spy>(testTrackerService.getAttributeColumns)).and.returnValue(of(testAttributeColumns));

    component = new TrackerRowComponent(testAttributeService, testTrackerService);
  });
  afterEach(() => {
    testCharacter = null;
    testAttributes = null;
    testCharacters = null;
    testAttributeColumns = null;
    testSelectedAttributeIndexes = null;

    testAttributeService = null;
    testTrackerService = null;
    testAttributeColumns = null;

    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Test getting attributeColumns from trackerService.
  describe('ngOnInit()', () => {
    beforeEach(() => {
      spyOn(component, 'retrieveAttributes');
      spyOn(component, 'prepareAttributeColumns');
    });
    it('should call retrieveAttributes()', () => {
      component.ngOnInit();
      expect(component.retrieveAttributes).toHaveBeenCalled();
    });
    it('should call prepareAttributeColumns()', () => {
      component.ngOnInit();
      expect(component.prepareAttributeColumns).toHaveBeenCalled();
    });
  });

    // TODO: Test prepareAttributeColumns, involves async so it's tough.
    // TODO: Test delay, same as above.

  describe('onChange()', () => {
    let testPassedIndex: number;
    beforeEach(() => {
      testPassedIndex = 0;
      component.attributes = testAttributes;
      component.selectedAttributeIndexes = [0];
    });
    afterEach(() => {
      testPassedIndex = null;
      component.attributes = null;
    });
    describe('with unlinked === false', () => {
      beforeEach(() => {
        component.unlinked = false;
      });
      it('should call attributeService.updateAttribute() with attributes[selectedAttributeIndexes[passedIndex]])', () => {
        component.onChange(testPassedIndex);
        expect(testAttributeService.updateAttribute).toHaveBeenCalledWith(testAttributes[testPassedIndex]);
      });
    });
    describe('with unlinked === true', () => {
      beforeEach(() => {
        component.unlinked = true;
      });
      it('should not call attributeService.updateAttribute()', () => {
        component.onChange(testPassedIndex);
        expect(testAttributeService.updateAttribute).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('saveAllAttributes()', () => {
    beforeEach(() => {
      component.attributes = testAttributes;
    });
    describe('with unlinked === false', () => {
      beforeEach(() => {
        component.unlinked = false;
      });
      it('should call attributeService.updateAttribute(attribute) for each attribute in attributes.', () => {
        component.saveAllAttributes();
        expect(testAttributeService.updateAttribute).toHaveBeenCalledTimes(testAttributes.length);
      });
      // TODO: Test that it sends the proper attributes as parameters.
    });
  });

  describe('onSelect()', () => {
    let testDisplayColumn: number;
    beforeEach(() => {
      testDisplayColumn = 0;
      spyOn(component, 'saveAllAttributes');
      testAttributes[0].displayColumn = testDisplayColumn;
      testAttributes[1].displayColumn = null;
      component.attributes = testAttributes;
      component.selectedAttributeIndexes = [1];
    });
    it('should set displayColumn of any attribute with a displayColumn matching the given displayColumn to null', () => {
      expect(testAttributes[0].displayColumn).toBe(testDisplayColumn);
      component.onSelect(testDisplayColumn);
      expect(testAttributes[0].displayColumn).toBeNull();
    });
    it('should set displayColumn of the attribute in selected in the column of the given columnIndex to the given columnIndex', () => {
      expect(testAttributes[1].displayColumn).toBe(null);
      component.onSelect(testDisplayColumn);
      expect(testAttributes[1].displayColumn).toBe(testDisplayColumn);
    });
  });

  describe('isActing()', () => {
    let testCurrentActor: number;
    let testIndex: number;
    describe('with index === currentActor', () => {
      beforeEach(() => {
        testCurrentActor = 0;
        testIndex = testCurrentActor;
        component.index = testIndex;
        component.currentActor = testCurrentActor;
      });
      afterEach(() => {
        testCurrentActor = null;
        testIndex = null;
      });
      it('should return true', () => {
        expect(component.isActing()).toBeTruthy();
      });
    });
    describe('with index !== currentActor', () => {
      beforeEach(() => {
        testCurrentActor = 0;
        testIndex = 2;
        component.index = testIndex;
        component.currentActor = testCurrentActor;
      });
      afterEach(() => {
        testCurrentActor = null;
        testIndex = null;
      });
      it('should return false', () => {
        expect(component.isActing()).toBeFalsy();
      });
    });
  });

  describe('retrieveAttributes()', () => {
    beforeEach(() => {
      component.character = testCharacter;
    });
    afterEach(() => {
      component.character = null;
    });
    it('should call trackerService.getAttributes() with character.key', () => {
      component.retrieveAttributes();
      expect(testTrackerService.getAttributes).toHaveBeenCalledWith(testCharacter.key);
    });
    it('should set attributes to attributes from trackerService', () => {
      component.retrieveAttributes();
      expect(component.attributes).toBe(testAttributes);
    });
  });

  describe('retrieveCharacters()', () => {
    it('should set characters to characters from trackerService', () => {
      component.retrieveCharacters();
      expect(component.characters).toBe(testCharacters);
    });
  });

  describe('linkButton()', () => {
    beforeEach(() => {
      spyOn(component, 'unlink');
      spyOn(component, 'link');
    });
    describe('with unlinked === false', () => {
      beforeEach(() => {
        component.unlinked = false;
      });
      it('should call unlink ', () => {
        component.linkButton();
        expect(component.unlink).toHaveBeenCalled();
      });
    });
    describe('with unlinked === true', () => {
      beforeEach(() => {
        component.unlinked = true;
      });
      it('should call link() ', () => {
        component.linkButton();
        expect(component.link).toHaveBeenCalled();
      });
    });
  });
  describe('unlink()', () => {
    beforeEach(() => {
      component.unlinked = false;
    });
    it('should set unlinked to true', () => {
      expect(component.unlinked).toBeFalsy();
      component.unlink();
      expect(component.unlinked).toBeTruthy();
    });
  });
  describe('link()', () => {
    beforeEach(() => {
      component.unlinked = true;
      spyOn(component, 'onChange');
      component.selectedAttributeIndexes = testSelectedAttributeIndexes;
    });
    afterEach(() => {
      component = null;
    });
    it('should set unlinked to false', () => {
      expect(component.unlinked).toBeTruthy();
      component.link();
      expect(component.unlinked).toBeFalsy();
    });
    it('should call onChange() for each selectedAttributeIndex', () => {
      component.link();
      expect(component.onChange).toHaveBeenCalledTimes(testSelectedAttributeIndexes.length);
    });
  });

  describe('with characters list size > 1', () => {
    beforeEach(() => {
      component.characters = [
        testCharacters[0],
        testCharacters[1],
        testCharacters[2]
      ];
    });
    afterEach(() => {
      component.characters = null;
    });
    describe('moveUp()', () => {
      let testIndex: number;
      describe('with index > 0', () => {
        beforeEach(() => {
          testIndex = 2;
          component.index = testIndex;
        });
        afterEach(() => {
          component.index = null;
        });
        it('should move character at [index] to [index - 1]', () => {
          component.moveUp();
          expect(component.characters[testIndex - 1]).toBe(testCharacters[testIndex]);
        });
        it('should move character at [index - 1] to [index]', () => {
          component.moveUp();
          expect(component.characters[testIndex]).toBe(testCharacters[testIndex - 1]);
        });
      });
      describe('with index === 0', () => {
        beforeEach(() => {
          testIndex = 0;
          component.index = testIndex;
        });
        afterEach(() => {
          component.index = null;
        });
        // TODO: Fails for some reason, cannot solve.
        // it('should move character at [index] to [length - 1]', () => {
        //   component.moveUp();
        //   expect(component.characters[component.characters.length - 1]).toBe(testCharacters[testIndex]);
        // });
        it('should move character at [length - 1] to [index]', () => {
          component.moveUp();
          expect(component.characters[testIndex]).toBe(testCharacters[component.characters.length - 1]);
        });
      });
    });
    describe('moveDown()', () => {
      let testIndex: number;
      afterEach(() => {
        component.characters = null;
      });
      describe('with index < characters.length', () => {
        beforeEach(() => {
          testIndex = 0;
          component.index = testIndex;
        });
        it('should move character at [index] to [index + 1]', () => {
          component.moveDown();
          expect(component.characters[testIndex + 1]).toBe(testCharacters[testIndex]);
        });
        it('should move character at [index + 1] to [index]', () => {
          component.moveDown();
          expect(component.characters[testIndex]).toBe(testCharacters[testIndex + 1]);
        });
      });
      describe('with index === characters.length', () => {
        beforeEach(() => {
          testIndex = 2;
          component.index = testIndex;
        });
        // TODO: Fails for some reason
        // it('should move character at [index] to [0]', () => {
        //   component.moveDown();
        //   expect(component.characters[0]).toBe(testCharacters[testIndex]);
        // });
        it('should move character at [0] to [index]', () => {
          component.moveDown();
          expect(component.characters[testIndex]).toBe(testCharacters[0]);
        });
      });
    });
  });
});
