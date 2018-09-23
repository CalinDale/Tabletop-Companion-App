import { TrackerService } from '../tracker.service';
import { AttributeService } from '../attribute.service';
import { CharacterService } from '../character.service';
import { CharacterDetailsComponent } from '../character-details/character-details.component';
import { MessageService } from '../message.service';
import { CharacterListEntryComponent } from './character-list-entry.component';
import { Character } from '../character';

describe('CharacterListEntryComponent', () => {
  let testCharacter: Character;
  let testCharacterDetails: CharacterDetailsComponent;
  let testMessageService: MessageService;
  let testTrackerService: TrackerService;
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

    component = new CharacterListEntryComponent(
      testMessageService,
      testTrackerService
    );
  });
  afterEach(() => {
    testCharacterDetails = null;
    testMessageService = null;
    testTrackerService = null;
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
