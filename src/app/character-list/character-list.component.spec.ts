import { MessageService } from '../message.service';
import { Character} from '../character';
import { CharacterService } from '../character.service';
import { CharacterListComponent } from './character-list.component';
import {  AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';

describe('CharacterListComponent', () => {
  let testCharacter: Character;
  let testCharacters: Character[];

  let testCharactersList: AngularFireList<Character>;
  let testCharacterService: CharacterService;
  let testMesageService: MessageService;

  let component: CharacterListComponent;

  beforeEach(() => {
    testCharacter = {
      key: '34',
      name: 'Grog',
      userID: 'Dave34'
    };
    testCharacters = [ testCharacter ];

    testCharactersList = jasmine.createSpyObj('testCharactersList', [
      'snapshotChanges'
    ]);
    (<jasmine.Spy>(testCharactersList.snapshotChanges)).and.returnValue( { pipe() {} } );

    testCharacterService = jasmine.createSpyObj('testCharacterService', [
      'getCharactersList',
      'createCharacter'
    ]);
    (<jasmine.Spy>(testCharacterService.getCharactersList)).and.returnValue(testCharactersList);

    testMesageService = jasmine.createSpyObj('testMessageService', [
      'add'
    ]);

    spyOn(firebase, 'auth').and.returnValue( { currentUser: { uid: testUserID } } );

    component = new CharacterListComponent(testCharacterService, testMesageService);
  });

  afterEach(() => {
    testCharacter = null;
    testCharacters = null;

    testCharactersList = null;
    testCharacterService = null;
    testMesageService = null;

    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Test getting characters from observable

  it('toggle() should set isOpen to the opposite of what it was', () => {
    const open = component.isOpen;
    component.toggle();
    expect(component.isOpen).toBe(!open);
  });

  describe('with Characters List', () => {
    beforeEach(() => {
      component.characters = testCharacters;
    });
    afterEach(() => {
      component.characters = null;
    });

    it('newCharacter() should call firebase.Auth()', () => {
      component.newCharacter();
      expect(firebase.auth).toHaveBeenCalled();
    });

    it('newCharacter() should call characterService.createCharacter()', () => {
      component.newCharacter();
      expect(testCharacterService.createCharacter).toHaveBeenCalled();
    });
  });
});
