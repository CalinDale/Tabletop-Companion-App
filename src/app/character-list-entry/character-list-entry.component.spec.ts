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

describe('CharacterListEntryComponent', () => {
  let testCharacter: Character;
  let testCharacterDetails: CharacterDetailsComponent;
  let testMessageService: MessageService;
  let testTrackerService: TrackerService;
  let testCharacterService: CharacterService;
  let testAttributes: Attribute[];
  let testAngularFireList: AngularFireList<Attribute>;
  let testAttributeService: AttributeService;
  let component: CharacterListEntryComponent;
  beforeEach(() => {
    testCharacter = <Character>{ key: 'Grog23'};
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
    (<jasmine.Spy>testCharacterService.getCharacterID).and.returnValue(testCharacter.key);

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
    testCharacterDetails = null;
    testMessageService = null;
    testTrackerService = null;
    testCharacterService = null;
    testAttributes = null;
    testAngularFireList = null;
    testAttributeService = null;
    component = null;
  });

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

  describe('addToTracker()', () => {
    it('should call trackerService.addToTracker()', () => {
      component.addToTracker();
      expect(testTrackerService.addToTracker).toHaveBeenCalled();
    });
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
