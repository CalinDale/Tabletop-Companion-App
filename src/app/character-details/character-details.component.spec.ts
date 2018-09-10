import { CharacterListComponent } from './../character-list/character-list.component';
import { MessageService } from '../message.service';
import { AttributeService } from '../attribute.service';
import { CharacterService } from '../character.service';
import { Character } from '../character';
import * as firebase from 'firebase';
import { Attribute } from './../attribute';

import { CharacterDetailsComponent } from './character-details.component';

describe('CharacterDetailsComponent', () => {
  let testUserID: string;
  let testCharacter: Character;
  let testAttributes: Attribute[];
  let testCharacterListComponent: CharacterListComponent;
  let testCharacterService: CharacterService;
  let testAttributeService: AttributeService;
  let testMessageService: MessageService;
  let component: CharacterDetailsComponent;

  beforeEach(() => {
    testUserID = 'Dave32';
    testCharacter = {
      userID: testUserID,
      key: 'Grog24',
      name: 'Grog'
    };
    testAttributes = [
      { userID: testUserID,
        key: 'armor24',
        name: 'Armor',
        type: 'number',
        value: '20',
        characterID: testCharacter.key }
    ];
    testCharacterListComponent = jasmine.createSpyObj('testCharacterListComponent', [
      'toggle'
    ]);

    testCharacterService = jasmine.createSpyObj('testCharacterService', [
      'updateCharacter',
      'deleteCharacter'
    ]);
    testAttributeService = jasmine.createSpyObj('testAttributeService', [
      'setCharacterID',
      'getAttributes',
      'createAttribute',
      'deleteAttribute'
    ]);
    (<jasmine.Spy>testAttributeService.getAttributes).and.returnValue(testAttributes);
    testMessageService = jasmine.createSpyObj('testMessageService', [
      'add'
    ]);
    component = new CharacterDetailsComponent(testCharacterService, testAttributeService, testMessageService);
    spyOn(firebase, 'auth').and.returnValue( { currentUser: { uid: testUserID } } );
  });

  afterEach(() => {
    testUserID = null;
    testCharacter = null;
    testAttributes = null;
    testCharacterListComponent = null;
    testCharacterService = null;
    testAttributeService = null;
    testMessageService = null;
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setCharacter() should set the character to a given character', () => {
    component.setCharacter(testCharacter);
    expect(component.character).toBe(testCharacter);
  });
  it('setCharacter() should call attributeService.setCharacterID with character.key', () => {
    component.setCharacter(testCharacter);
    expect(testAttributeService.setCharacterID).toHaveBeenCalledWith(testCharacter.key);
  });
  it('setCharacter() should call retrieveAttributes()', () => {
    spyOn(component, 'retrieveAttributes');
    component.setCharacter(testCharacter);
    expect(component.retrieveAttributes).toHaveBeenCalled();
  });
  it('setCharacter() should call toggle()', () => {
    spyOn(component, 'toggle');
    component.setCharacter(testCharacter);
    expect(component.toggle).toHaveBeenCalled();
  });

  describe('with characterListComponent', () => {
    beforeEach(() => {
      component.characterListComponent = testCharacterListComponent;
    });
    afterEach(() => {
      component.characterListComponent = null;
    });
    it('toggle() should call characterListComponent.toggle()', () => {
      component.toggle();
      expect(testCharacterListComponent.toggle).toHaveBeenCalled();
    });
    describe('with isOpen true', () => {
      beforeEach(() => {
        component.isOpen = true;
      });
      afterEach(() => {
        component.isOpen = null;
      });
      it('toggle() should set isOpen to false', () => {
        component.toggle();
        expect(component.isOpen).toBeFalsy();
      });
    });
    describe('with isOpen false', () => {
      beforeEach(() => {
        component.isOpen = false;
      });
      afterEach(() => {
        component.isOpen = null;
      });
      it('toggle() should set isOpen to true', () => {
        component.toggle();
        expect(component.isOpen).toBeTruthy();
      });
    });
  });

  describe('with valid Character', () => {
    beforeEach(() => {
      component.character = testCharacter;
    });
    afterEach(() => {
      component.character = null;
    });

    it('retrieveAttributes() should call attributeService.getAttributes with character.key', () => {
      component.retrieveAttributes();
      expect(testAttributeService.getAttributes).toHaveBeenCalledWith(testCharacter.key);
    });
    // TODO: Try this test, it may fail.
    it('retrieveAttributes() should set attributes to attributeService.getAttributes() returned list', () => {
      component.retrieveAttributes();
      expect(component.attributes).toBe(testAttributes);
    });

    // TODO: better tests for AddAttribute. Try and test that the passed attribute contains the CharacterID and UserID
    it('addAttribute() should call attributeService.createAttribute()', () => {
      component.addAttribute();
      expect(testAttributeService.createAttribute).toHaveBeenCalled();
    });
    it('addAttribute() should call firebase.auth()', () => {
      component.addAttribute();
      expect(firebase.auth).toHaveBeenCalled();
    });

    it('updateCharacter() should call characterservice.updateCharacter() with character', () => {
      component.updateCharacter();
      expect(testCharacterService.updateCharacter).toHaveBeenCalledWith(testCharacter);
    });

    it('deleteCharacter() should call toggle()', () => {
      spyOn(component, 'toggle');
      component.deleteCharacter();
      expect(component.toggle).toHaveBeenCalled();
    });
    it('deleteCharacter() should call characterService.deleteCharacter() with character.key', () => {
      component.deleteCharacter();
      expect(testCharacterService.deleteCharacter).toHaveBeenCalledWith(testCharacter.key);
    });
    it('deleteAttribute() should call attributeService.deleteAttribute() with attribute.key', () => {
      component.deleteCharacter();
      expect(testAttributeService.deleteAttribute).toHaveBeenCalledWith(testAttributes[0].key);
    });
    it('deleteAttribute() should call attributeService.deleteAttribute() for every attribute in attributes', () => {
      component.deleteCharacter();
      expect(testAttributeService.deleteAttribute).toHaveBeenCalledTimes(testAttributes.length);
    });
  });
});
