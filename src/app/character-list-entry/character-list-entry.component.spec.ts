import { CharacterService } from './../character.service';
import { CharacterDetailsComponent } from '../character-details/character-details.component';
import { MessageService } from '../message.service';
import { CharacterListEntryComponent } from './character-list-entry.component';
import { Character } from '../character';

describe('CharacterListEntryComponent', () => {
  let testCharacter: Character;
  let testCharacterDetails: CharacterDetailsComponent;
  let testMessageService: MessageService;
  let testCharacterService: CharacterService;
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
    testCharacterService = jasmine.createSpyObj('testCharacterService', [
      'updateCharacter'
    ]);

    component = new CharacterListEntryComponent(
      testMessageService,
      testCharacterService
    );
  });
  afterEach(() => {
    testCharacterDetails = null;
    testMessageService = null;
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
    beforeEach(() => {
      component.character.tracked = false;
    });
    afterEach(() => {
      component.character.tracked = null;
    });
    it('should set character.tracked to true', () => {
      component.addToTracker();
      expect(component.character.tracked).toBeTruthy();
    });
    it('should call characterService.setCharacterID with character.key', () => {
      component.addToTracker();
      expect(testCharacterService.setCharacterID).toHaveBeenCalledWith(component.character.key);
    });
    it('should call characterService.updateCharacter with character', () => {
      component.addToTracker();
      expect(testCharacterService.updateCharacter).toHaveBeenCalledWith(component.character);
    });
  });

  describe('removeFromTracker()', () => {
    beforeEach(() => {
      component.character.tracked = true;
    });
    afterEach(() => {
      component.character.tracked = null;
    });
    it('should set character.tracked to false', () => {
      component.addToTracker();
      expect(component.character.tracked).toBeFalsy();
    });
    it('should call characterService.setCharacterID with character.key', () => {
      component.addToTracker();
      expect(testCharacterService.setCharacterID).toHaveBeenCalledWith(component.character.key);
    });
    it('should call characterService.updateCharacter with character', () => {
      component.addToTracker();
      expect(testCharacterService.updateCharacter).toHaveBeenCalledWith(component.character);
    });
  });
});
