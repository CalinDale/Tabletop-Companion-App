import { AttributeService } from './attribute.service';
import { CharacterService } from './character.service';
import { TrackerService } from './tracker.service';
import { Attribute } from './attribute';
import { Character } from './character';
import { AngularFireList } from 'angularfire2/database';

describe('TrackerService', () => {
  let testCharacters: Character[];
  let testNumAttributeColumns: number;
  let testAttributeColumns: Attribute[];
  let testCurrentActor: number;

  let testCharacterService: CharacterService;
  let testAttributeService: AttributeService;

  let service: TrackerService;
  beforeEach(() => {
    testCharacters = [
      <Character>{name: '0'},
      <Character>{name: '1'},
      <Character>{name: '2'}
    ];
    testNumAttributeColumns = 3;
    testAttributeColumns = [];
    testCurrentActor = 2;

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
    testCharacters = null;
    testNumAttributeColumns = null;
    testAttributeColumns = null;
    testCurrentActor = null;

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
    beforeEach(() => {
      service.numAttributeColumns = testNumAttributeColumns;
      service.attributeColumns = testAttributeColumns;
    });
    afterEach(() => {
      service.numAttributeColumns = null;
      service.attributeColumns = null;
    });
    it('should create as many attributes in AttributeColumns as numAttributeColumns', () => {
      service.prepareAttributeColumns();
      expect(service.attributeColumns.length).toBe(3);
    });
  });

  describe('getAttributeColumns()', () => {
    beforeEach(() => {
      service.attributeColumns = testAttributeColumns;
    });
    afterEach(() => {
      service.attributeColumns = null;
    });
    it('should return observable of attribute Columns', () => {
      let returnedAttributeColumns: Attribute[];
      service.getAttributeColumns().subscribe( attributeColumns => {
        returnedAttributeColumns = attributeColumns;
      });
      expect(returnedAttributeColumns).toBe(testAttributeColumns);
    });
  });

  describe('getCurrentActor()', () => {
    beforeEach(() => {
      service.currentActor = testCurrentActor;
    });
    afterEach(() => {
      service.currentActor = null;
    });
    it('should return observable of currentActor', () => {
      let returnedCurrentActor: number;
      service.getCurrentActor().subscribe( currentActor => {
        returnedCurrentActor = currentActor;
      });
      expect(returnedCurrentActor).toBe(testCurrentActor);
    });
  });

  describe('nextTurn()', () => {
    beforeEach(() => {
      spyOn(service, 'moveMarkerDown');
    });
    it('should call moveMarckerDown()', () => {
      service.nextTurn();
      expect(service.moveMarkerDown).toHaveBeenCalled();
    });
  });

  describe('moveMarkerDown()', () => {
    beforeEach(() => {
      service.currentActor = testCurrentActor;
      spyOn(service, 'checkMarkerPosition');
    });
    afterEach(() => {
      service.currentActor = null;
    });
    it('should increment currentActor', () => {
      service.moveMarkerDown();
      expect(service.currentActor).toBe(testCurrentActor + 1);
    });
    it('should call checkMarkerPosition()', () => {
      service.moveMarkerDown();
      expect(service.checkMarkerPosition).toHaveBeenCalled();
    });
  });

  describe('prevTurn()', () => {
    beforeEach(() => {
      spyOn(service, 'moveMarkerUp');
    });
    it('should call moveMarckerUp()', () => {
      service.prevTurn();
      expect(service.moveMarkerUp).toHaveBeenCalled();
    });
  });

  describe('moveMarkerUp()', () => {
    beforeEach(() => {
      service.currentActor = testCurrentActor;
      spyOn(service, 'checkMarkerPosition');
    });
    afterEach(() => {
      service.currentActor = null;
    });
    it('should decrement currentActor', () => {
      service.moveMarkerUp();
      expect(service.currentActor).toBe(testCurrentActor - 1);
    });
    it('should call checkMarkerPosition()', () => {
      service.moveMarkerUp();
      expect(service.checkMarkerPosition).toHaveBeenCalled();
    });
  });

  describe('with characters list size > 1', () => {
    beforeEach(() => {
      service.characters = [
        <any>{key: '0'},
        <any>{key: '1'},
        <any>{key: '2'}
      ];
    });
    afterEach(() => {
      service.characters = null;
    });

    describe('checkMarkerPosition()', () => {
      describe('with currentActor >= characters.length', () => {
        beforeEach(() => {
          service.currentActor = service.characters.length;
        });
        afterEach(() => {
          service.currentActor = null;
        });
        it('should set currentActor to 0', () => {
          service.checkMarkerPosition();
          expect(service.currentActor).toBe(0);
        });
      });
      describe('with currentActor < 0', () => {
        beforeEach(() => {
          service.currentActor = -1;
        });
        afterEach(() => {
          service.currentActor = null;
        });
        it('should set currentActor to characters.length - 1', () => {
          service.checkMarkerPosition();
          expect(service.currentActor).toBe( service.characters.length - 1);
        });
      });
      describe('with 0 < currentActor < characters.length', () => {
        let testCurrentActorBetween: number;
        beforeEach(() => {
          testCurrentActorBetween = 1;
          service.currentActor = testCurrentActorBetween;
        });
        afterEach(() => {
          service.currentActor = null;
        });
        it('should not change currentMarker', () => {
          service.checkMarkerPosition();
          expect(service.currentActor).toBe( testCurrentActorBetween);
        });
      });
    });

    // describe('moveCharacterUp()', () => {
    //   let testIndex: number;
    //   afterEach(() => {
    //     service.characters = null;
    //   });
    //   describe('with index > 0', () => {
    //     beforeEach(() => {
    //       testIndex = 2;
    //     });
    //     it('should move character at [index] to [index - 1]', () => {
    //       service.moveCharacterUp(testIndex);
    //       expect(service.characters[testIndex - 1].key).toBe(testIndex.toString());
    //     });
    //     it('should move character at [index - 1] to [index]', () => {
    //       service.moveCharacterUp(testIndex);
    //       expect(service.characters[testIndex].key).toBe((testIndex - 1).toString());
    //     });
    //   });
    //   describe('with index === 0', () => {
    //     beforeEach(() => {
    //       testIndex = 0;
    //     });
    //     it('should move character at [index] to [length - 1]', () => {
    //       service.moveCharacterUp(testIndex);
    //       expect(service.characters[service.characters.length - 1].key).toBe(testIndex.toString());
    //     });
    //     it('should move character at [length - 1] to [index]', () => {
    //       service.moveCharacterUp(testIndex);
    //       expect(service.characters[testIndex].key).toBe((service.characters.length - 1).toString());
    //     });
    //   });
    // });
    // describe('moveCharacterDown()', () => {
    //   let testIndex: number;
    //   afterEach(() => {
    //     service.characters = null;
    //   });
    //   describe('with index < characters.length', () => {
    //     beforeEach(() => {
    //       testIndex = 0;
    //     });
    //     it('should move character at [index] to [index + 1]', () => {
    //       service.moveCharacterDown(testIndex);
    //       expect(service.characters[testIndex + 1].key).toBe(testIndex.toString());
    //     });
    //     it('should move character at [index + 1] to [index]', () => {
    //       service.moveCharacterDown(testIndex);
    //       expect(service.characters[testIndex].key).toBe((testIndex + 1).toString());
    //     });
    //   });
    //   describe('with index === characters.length', () => {
    //     beforeEach(() => {
    //       testIndex = 2;
    //     });
    //     it('should move character at [index] to [0]', () => {
    //       service.moveCharacterDown(testIndex);
    //       expect(service.characters[0].key).toBe(testIndex.toString());
    //     });
    //     it('should move character at [0] to [index]', () => {
    //       service.moveCharacterDown(testIndex);
    //       expect(service.characters[testIndex].key).toBe((0).toString());
    //     });
    //   });
    // });
  });

  // TODO: Test this function with mock observables
  // describe('addToTracker()', () => {
  //   let testCharacter: Character;
  //   beforeEach(() => {
  //     testCharacter = <Character>{
  //       key: '0'
  //     };
  //   });
  //   afterEach(() => {
  //     testCharacter = null;
  //   });
  //   it('should call characterService.trackCharacter() with passed character', () => {
  //     service.addToTracker(testCharacter);
  //     expect(testCharacterService.trackCharacter).toHaveBeenCalledWith(testCharacter);
  //   });
  // });

  // TODO: Test this function with mock observables
  // describe('removeFromTracker()', () => {
  //   let testCharacter: Character;
  //   beforeEach(() => {
  //     testCharacter = testCharacters[0];
  //   });
  //   afterEach(() => {
  //     testCharacter = null;
  //   });
  //   it('should call characterService.untrackCharacter() with passed character', () => {
  //     service.removeFromTracker(testCharacter);
  //     expect(testCharacterService.untrackCharacter).toHaveBeenCalledWith(testCharacter);
  //   });
  // });
});
