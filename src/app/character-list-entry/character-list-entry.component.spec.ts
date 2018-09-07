import { CharacterDetailsComponent } from './../character-details/character-details.component';
import { MessageService } from '../message.service';
import { CharacterService } from '../character.service';

import { CharacterListEntryComponent } from './character-list-entry.component';

import { AttributeService } from '../attribute.service';

import { Router } from '@angular/router';
import { Character } from '../character';

describe('CharacterListEntryComponent', () => {
  let testCharacterService: CharacterService;
  let testMessageService: MessageService;
  let testAttributeSerice: AttributeService;
  let testRouter: Router;
  let component: CharacterListEntryComponent;
  beforeEach(() => {
    testCharacterService = jasmine.createSpyObj('testCharacterService', [
      'deleteCharacter',
      'updateCharacter'
    ]);
    testMessageService = jasmine.createSpyObj('testMessageService', [
      'add'
    ]);
    testAttributeSerice = jasmine.createSpyObj('testAttributeService', [
      'setCharacterID'
    ]);
    testRouter = jasmine.createSpyObj('testRouter', [
      'navigateByUrl'
    ]);
    component = new CharacterListEntryComponent(
      testCharacterService,
      testMessageService,
      testAttributeSerice,
      testRouter
    );
  });
  afterEach(() => {
    testCharacterService = null;
    testMessageService = null;
    testAttributeSerice = null;
    testRouter = null;
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
    describe('with characterDetailsComponent', () => {
      let testCharacterDetails: CharacterDetailsComponent;
      beforeEach(() => {
        testCharacterDetails = jasmine.createSpyObj('testCharacterDetails', [
          'setCharacter'
        ]);
        component.characterDetails = testCharacterDetails;
      });
      afterEach(() => {
        testCharacter = null;
      });
      it('editCharacter() should setCharacterID in attributeService with CharacterID', () => {
        component.editCharacter();
        expect(testAttributeSerice.setCharacterID).toHaveBeenCalledWith(testCharacter.key);
      });
      it('editCharacter() should setCharacter in characterDetails with Character', () => {
        component.editCharacter();
        expect(testCharacterDetails.setCharacter).toHaveBeenCalledWith(testCharacter);
      });
    });
  });
});
