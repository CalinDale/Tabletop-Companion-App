import { CharacterListComponent } from '../character-list/character-list.component';
import { MessageService } from '../message.service';
import { AttributeService } from '../attribute.service';
import { CharacterService } from '../character.service';
import { Character } from '../character';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import * as firebase from 'firebase';

import { CharacterDetailsComponent } from './character-details.component';

describe('CharacterDetailsComponent', () => {
  let testUserID: string;
  let testCharacterService: CharacterService;
  let testAttributeService: AttributeService;
  let testMessageService: MessageService;
  let component: CharacterDetailsComponent;

  let testAuthFunction: Function;

  beforeEach(() => {
    testUserID = 'Dave32';
    testCharacterService = jasmine.createSpyObj('testCharacterService', [
      'something needs to be here'
    ]);
    testAttributeService = jasmine.createSpyObj('testAttributeService', [
      'retriveAttributes'
    ]);
    testMessageService = jasmine.createSpyObj('testMessageService', [
      'add'
    ]);
    component = new CharacterDetailsComponent(testCharacterService, testAttributeService, testMessageService);
    spyOn(firebase, 'auth').and.returnValue( { currentUser: { uid: testUserID } } );

  });

  afterEach(() => {
    testUserID = null;
    testCharacterService = null;
    testAttributeService = null;
    testMessageService = null;
    component = null;
    testAuthFunction = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('with Character', () => {
    let testCharacterID: string;
    let testCharacterName: string;
    let testCharacter: Character;

    beforeEach(() => {
      testCharacterID = 'Grog24';
      testCharacterName = 'Grog';
      testCharacter = <Character>{ key: testCharacterID, name: testCharacterName };
      component = new CharacterDetailsComponent(testCharacterService, testAttributeService, testMessageService);
      component.character = testCharacter;
      component.characterID = testCharacterID;

      testAuthFunction = firebase.auth;
      spyOn(firebase, 'auth').and.returnValue( { currentUser: { uid: testUserID } } );
    });

    afterEach(() => {
      testCharacterID = null;
      testCharacterName = null;
      testCharacter = null;
    });

    // TODO: retrieveAttributes should do stuff.

    it('toggle() should set isOpen to the opposite of what it was', () => {
      const open = component.isOpen;
      component.toggle();
      expect(component.isOpen).toBe(!open);
    });

    describe('with CharacterListComponent', () => {
      let testCharacterListComponent: CharacterListComponent;

      beforeEach(() => {
        testCharacterListComponent = jasmine.createSpyObj('testCharacterListComponent', [
          'toggle'
        ]);
        component.characterListComponent = testCharacterListComponent;
      });

      afterEach(() => {
        testCharacterListComponent = null;
      });

      it('toggle() should call CharacterListComponent.toggle()', () => {
        component.toggle();
        expect(testCharacterListComponent.toggle).toHaveBeenCalled();
      });
    });
  });
});
