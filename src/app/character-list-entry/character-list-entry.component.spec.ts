import { CharacterDetailsComponent } from '../character-details/character-details.component';
import { MessageService } from '../message.service';
import { CharacterListEntryComponent } from './character-list-entry.component';
import { Character } from '../character';

describe('CharacterListEntryComponent', () => {
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

    component = new CharacterListEntryComponent(
      testMessageService
    );
  });
  afterEach(() => {
    testCharacterDetails = null;
    testMessageService = null;
    component = null;
  });

  describe('with valid character', () => {
    let testCharacter: Character;
    beforeEach(() => {
      testCharacter = <Character>{ key: 'Grog23'};
      component.character = testCharacter;
    });
    afterEach(() => {
      testCharacter = null;
    });

    describe('editCharacter()', () => {
      beforeEach(() => {
        component.characterDetails = testCharacterDetails;
      });
      afterEach(() => {
      });
      it('should setCharacter in characterDetails with Character', () => {
        component.editCharacter();
        expect(testCharacterDetails.setCharacter).toHaveBeenCalledWith(testCharacter);
      });
    });
  });
});
