import { CharacterDetailsComponent } from '../character-details/character-details.component';
import { MessageService } from '../message.service';
import { CharacterListEntryComponent } from './character-list-entry.component';
import { Character } from '../character';

describe('CharacterListEntryComponent', () => {
  let testCharacter: Character;
  let testCharacterDetails: CharacterDetailsComponent;
  let testMessageService: MessageService;
  let component: CharacterListEntryComponent;
  beforeEach(() => {
    testCharacterDetails = jasmine.createSpyObj('testCharacterDetails', [
      'setCharacter'
    ]);
    testMessageService = jasmine.createSpyObj('testMessageService', [
      'add'
    ]);
    testCharacter = <Character>{ key: 'Grog23'};

    component = new CharacterListEntryComponent(
      testMessageService
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
});
