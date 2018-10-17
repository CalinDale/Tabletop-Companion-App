import { of, Observable } from 'rxjs';
import { AngularFireList } from 'angularfire2/database';
import { TrackerService } from './../tracker.service';
import { AttributeService } from './../attribute.service';
import { CharacterService } from './../character.service';
import { CharacterDetailsComponent } from '../character-details/character-details.component';
import { MessageService } from '../message.service';
import { CharacterListEntryComponent } from './character-list-entry.component';
import { Character } from '../character';
import { Attribute } from '../attribute';
import * as firebase from 'firebase';

describe('CharacterListEntryComponent', () => {
  let testCharacter: Character;
  let testCloneKey: String;
  let testCharacterDetails: CharacterDetailsComponent;
  let testMessageService: MessageService;
  let testTrackerService: TrackerService;
  let testCharacterService: CharacterService;
  let testAttributes: Attribute[];
  let testAngularFireList: AngularFireList<Attribute>;
  let testAttributeService: AttributeService;
  let component: CharacterListEntryComponent;
  beforeEach(() => {
    testCharacter = { key: 'Grog23', name: 'Grog', userID: 'Dave3', tracked: false};
    testCloneKey = 'Clone24';
    testCharacterDetails = jasmine.createSpyObj('testCharacterDetails', [
      'setCharacter'
    ]);
    testMessageService = jasmine.createSpyObj('testMessageService', [
      'add',
      'setCharacterID'
    ]);
    testTrackerService = jasmine.createSpyObj('testTrackerService', [
      'addToTracker',
      'removeFromTracker'
    ]);
    testCharacterService = jasmine.createSpyObj('testCharacterService', [
      'createCharacter',
      'getCharacterID'
    ]);
    (<jasmine.Spy>testCharacterService.getCharacterID).and.returnValue(testCloneKey);

    testAttributes = <any>[ { key: 'attribute0' } ];
    testAngularFireList = <any>{
      snapshotChanges(): Observable<Attribute[]> { return (of(testAttributes)); }
    };

    testAttributeService = jasmine.createSpyObj('testAttributeService', [
      'getAttributes',
      'cloneAttributes'
    ]);
    (<jasmine.Spy>testAttributeService.getAttributes).and.returnValue(testAngularFireList);

    component = new CharacterListEntryComponent(
      testMessageService,
      testTrackerService,
      testCharacterService,
      testAttributeService
    );
  });
  afterEach(() => {
    testCharacter = null;
    testCloneKey = null;
    testCharacterDetails = null;
    testMessageService = null;
    testTrackerService = null;
    testCharacterService = null;
    testAttributes = null;
    testAngularFireList = null;
    testAttributeService = null;
    component = null;
  });

  // TODO: Test this, difficult since it's async
  // describe('cloneCharacter()', () => {
  //   let testUserID: string;
  //   beforeEach(() => {
  //     testUserID = 'Dave24';
  //     spyOn(firebase, 'auth').and.returnValue( { currentUser: { uid: testUserID } } );
  //     spyOn(component, 'delay');
  //     spyOn(component, 'cloneAttributes');
  //     testCharacter.name = 'John';
  //   });
  //   afterEach(() => {
  //     testUserID = null;
  //   });
  //   // TODO: Improve test to check that the cloneCharacter's name and userID are correct
  //   it('should call createCharacter()', () => {
  //     component.cloneCharacter();
  //     expect(testCharacterService.createCharacter).toHaveBeenCalled();
  //   });
  //   // TODO: Consider not checking for 500 exactly, but instead just for a substantial time.
  //   it('should call delay() with 500', () => {
  //     component.cloneCharacter();
  //     expect(component.delay).toHaveBeenCalledWith(500);
  //   });
  //   it('should call cloneAttributes', () => {
  //     component.cloneCharacter();
  //     expect(component.cloneAttributes).toHaveBeenCalled();
  //   });
  // });

  // TODO: Test this somehow.
  // describe('delay()', () => {
  //   it('should call setTimeout()', () => {
  //   });
  // });

  // TODO: Test this, observable data source.
  // describe('cloneAttributes()', () => {
  //   beforeEach(() => {
  //     spyOn(component, 'store');
  //   });
  //   it('should call attributeService.getAttributes() with character.key', () => {
  //     component.character = testCharacter;
  //     component.cloneAttributes();
  //     expect(testAttributeService.getAttributes).toHaveBeenCalledWith(testCharacter.key);
  //   });
  //
  //   // TODO: Test that store is called with the correct attributes list (Observable source)
  //   it('should call store() with attributes from AttributeService', () => {
  //     component.cloneAttributes();
  //     expect(component.store).toHaveBeenCalledWith(testAttributes);
  //   });
  // });

  // TODO: test store, which is also async

  describe('editCharacter()', () => {
    beforeEach(() => {
      component.characterDetails = testCharacterDetails;
      component.character = testCharacter;
    });
    afterEach(() => {
      component.characterDetails = null;
      component.character = null;
    });
    it('should setCharacter in characterDetails with Character', () => {
      component.editCharacter();
      expect(testCharacterDetails.setCharacter).toHaveBeenCalledWith(testCharacter);
    });
  });

  describe('trackerButton()', () => {
    beforeEach(() => {
      spyOn(component, 'addToTracker');
      spyOn(component, 'removeFromTracker');
      component.character = testCharacter;
    });
    afterEach(() => {
      component.character = null;
    });
    describe('with character.tracked === false', () => {
      beforeEach(() => {
        testCharacter.tracked = false;
      });
      it('should call addToTracker() ', () => {
        component.trackerButton();
        expect(component.addToTracker).toHaveBeenCalled();
      });
    });
    describe('with character.tracked === true', () => {
      beforeEach(() => {
        testCharacter.tracked = true;
        component.character = testCharacter;
      });
      it('should call addToTracker() ', () => {
        component.trackerButton();
        expect(component.removeFromTracker).toHaveBeenCalled();
      });
    });
  });

  describe('addToTracker()', () => {
    it('should call trackerService.addToTracker()', () => {
      component.addToTracker();
      expect(testTrackerService.addToTracker).toHaveBeenCalled();
    });

    // Moved to TrackerService
    // it('should set character.tracked to true', () => {
    //   component.addToTracker();
    //   expect(component.character.tracked).toBeTruthy();
    // });
    // it('should call characterService.setCharacterID with character.key', () => {
    //   component.addToTracker();
    //   expect(testCharacterService.setCharacterID).toHaveBeenCalledWith(component.character.key);
    // });
    // it('should call characterService.updateCharacter with character', () => {
    //   component.addToTracker();
    //   expect(testCharacterService.updateCharacter).toHaveBeenCalledWith(component.character);
    // });
  });

  describe('removeFromTracker()', () => {
    it('should call trackerService.removeFromTracker()', () => {
      component.removeFromTracker();
      expect(testTrackerService.removeFromTracker).toHaveBeenCalled();
    });

    // Moved to TrackerService
    // it('should set character.tracked to false', () => {
    //   component.addToTracker();
    //   expect(component.character.tracked).toBeFalsy();
    // });
    // it('should call characterService.setCharacterID with character.key', () => {
    //   component.addToTracker();
    //   expect(testCharacterService.setCharacterID).toHaveBeenCalledWith(component.character.key);
    // });
    // it('should call characterService.updateCharacter with character', () => {
    //   component.addToTracker();
    //   expect(testCharacterService.updateCharacter).toHaveBeenCalledWith(component.character);
    // });
  });
});
