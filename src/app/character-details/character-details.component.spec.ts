import { Observable, of } from 'rxjs';
import { AngularFireList } from 'angularfire2/database';
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
  let testAngularFireList: AngularFireList<Attribute>;
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
      name: 'Grog',
      tracked: false
    };
    testAttributes = [
      { userID: testUserID,
        key: 'armor24',
        name: 'Armor',
        type: 'number',
        value: '20',
        characterID: testCharacter.key,
        tracked: false }
    ];

    testAngularFireList = <any>{
      snapshotChanges(): Observable<Attribute[]> { return (of(testAttributes)); }
    };

    testCharacterListComponent = jasmine.createSpyObj('testCharacterListComponent', [
      'toggle'
    ]);

    testCharacterService = jasmine.createSpyObj('testCharacterService', [
      'setCharacterID',
      'updateCharacter',
      'deleteCharacter'
    ]);
    testAttributeService = jasmine.createSpyObj('testAttributeService', [
      'getAttributes',
      'createAttribute',
      'updateAttribute',
      'deleteAttribute'
    ]);
    (<jasmine.Spy>testAttributeService.getAttributes).and.returnValue(testAngularFireList);
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
    testAngularFireList = null;
    testCharacterListComponent = null;
    testCharacterService = null;
    testAttributeService = null;
    testMessageService = null;
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setCharacter()', () => {
    beforeEach(() => {
      spyOn(component, 'retrieveAttributes');
      spyOn(component, 'toggle');
    });
    it('should set character to passed character', () => {
      component.setCharacter(testCharacter);
      expect(component.character).toBe(testCharacter);
    });
    it('should call characterService.setCharacterID with character.key', () => {
      component.setCharacter(testCharacter);
      expect(testCharacterService.setCharacterID).toHaveBeenCalledWith(component.character.key);
    });
    it('should call component.retrieveAttributes()', () => {
      component.setCharacter(testCharacter);
      expect(component.retrieveAttributes).toHaveBeenCalled();
    });
    it('should call component.toggle()', () => {
      component.setCharacter(testCharacter);
      expect(component.toggle).toHaveBeenCalled();
    });
  });

  // TODO: Test RetrieveAttributes()
  // describe('retrieveAttributes()', () => {
  //   describe('with valid character', () => {
  //     beforeEach(() => {
  //       component.character = testCharacter;
  //     });
  //     afterEach(() => {
  //       component.character = null;
  //     });
  //     it('should call attributeService.getAttributes with character.key', () => {
  //       component.retrieveAttributes();
  //       expect(testAttributeService.getAttributes).toHaveBeenCalledWith(component.character.key);
  //     });
  //   });
  // });

  describe('addAttribute()', () => {
    beforeEach(() => {
      spyOn(component, 'updateCharacter');
      component.character = testCharacter;
    });
    afterEach(() => {
      component.character = null;
    });
    it('should call updateCharacter()', () => {
      component.addAttribute();
      expect(component.updateCharacter).toHaveBeenCalled();
    });
    it('should call attributeService.createAttribute() with a new attribute', () => {
      component.addAttribute();
      expect(testAttributeService.createAttribute).toHaveBeenCalled();
    });
    // TODO: check that the new attribute got the ids properly.
  });

  describe('close()', () => {
    beforeEach(() => {
      spyOn(component, 'updateCharacter');
      spyOn(component, 'toggle');
    });
    it('should call updateCharacter()', () => {
      component.close();
      expect(component.updateCharacter).toHaveBeenCalled();
    });
    it('should call toggle()', () => {
      component.close();
      expect(component.toggle).toHaveBeenCalled();
    });
  });

  describe('toggle()', () => {
    beforeEach(() => {
      component.characterListComponent = testCharacterListComponent;
    });
    afterEach(() => {
      component.characterListComponent = null;
    });
    it('should set isOpen to the opposite of what it was', () => {
      const open = component.isOpen;
      component.toggle();
      expect(component.isOpen).toBe(!open);
    });
    it('should call characterListComponent.toggle()', () => {
      component.toggle();
      expect(testCharacterListComponent.toggle).toHaveBeenCalled();
    });
  });

  describe('updateCharacter()', () => {
    beforeEach(() => {
      component.character = testCharacter;
      component.attributes = testAttributes;
    });
    afterEach(() => {
      component.character = null;
      component.attributes = null;
    });
    it('should call characterService.updateCharacter() with character', () => {
      component.updateCharacter();
      expect(testCharacterService.updateCharacter).toHaveBeenCalledWith(testCharacter);
    });
    it('should call attributeService.updateAttribute() with all attributes from list', () => {
      component.updateCharacter();
      expect(testAttributeService.updateAttribute).toHaveBeenCalledTimes(testAttributes.length);
      expect(testAttributeService.updateAttribute).toHaveBeenCalledWith(testAttributes[0]);
    });
  });

  describe('deleteCharacter()', () => {
    beforeEach(() => {
      spyOn(component, 'close');
      component.character = testCharacter;
      component.attributes = testAttributes;
    });
    afterEach(() => {
      component.character = null;
      component.attributes = null;
    });
    it('should call close()', () => {
      component.deleteCharacter();
      expect(component.close).toHaveBeenCalled();
    });
    it('should call characterService.deleteCharacter() with character.key', () => {
      component.deleteCharacter();
      expect(testCharacterService.deleteCharacter).toHaveBeenCalledWith(testCharacter.key);
    });
    it('should call attributeService.updateAttribute() with all attribute.keys from list', () => {
      component.deleteCharacter();
      expect(testAttributeService.deleteAttribute).toHaveBeenCalledTimes(testAttributes.length);
      expect(testAttributeService.deleteAttribute).toHaveBeenCalledWith(testAttributes[0].key);
    });
  });
});
