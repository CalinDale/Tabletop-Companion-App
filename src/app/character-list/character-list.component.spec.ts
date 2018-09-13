import { of, Observable } from 'rxjs';
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

    // testCharactersList = <any>{
    //   snapshotChanges(): Observable<any> {
    //     return of(testCharacters);
    //   }
    // };

    testCharacterService = jasmine.createSpyObj('testCharacterService', [
      'getCharactersList',
      'createCharacter'
    ]);
    // (<jasmine.Spy>(testCharacterService.getCharactersList)).and.returnValue(testCharactersList);

    testMesageService = jasmine.createSpyObj('testMessageService', [
      'add'
    ]);

    spyOn(firebase, 'auth').and.returnValue( { currentUser: { uid: testCharacter.userID } } );

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

  describe('ngOnInit()', () => {
    beforeEach(() => {
      spyOn(component, 'getCharactersList');
    });
    afterEach(() => {
    });
    it('should call component.getCharactersList()', () => {
      component.ngOnInit();
      expect(component.getCharactersList).toHaveBeenCalled();
    });
  });

  // TODO: test getCharactersList();
  // describe('getCharactersList()', () => {
  //   beforeEach(() => {
  //   });
  //   afterEach(() => {
  //   });
  //   it('should set component.characters to database Characters', () => {
  //     component.getCharactersList();
  //     expect(component.characters).toBe(testCharacters);
  //   });
  // });

  describe('with characters list', () => {
    beforeEach(() => {
      component.characters = testCharacters;
    });
    afterEach(() => {
      component.characters = null;
    });
    describe('newCharacter()', () => {
      it('should call firebase.Auth()', () => {
        component.newCharacter();
        expect(firebase.auth).toHaveBeenCalled();
      });
      it('should call characterService.createCharacter()', () => {
        component.newCharacter();
        expect(testCharacterService.createCharacter).toHaveBeenCalled();
      });
    });
  });

  describe('toggle()', () => {
    it('should set isOpen to the opposite of what it was', () => {
      const open = component.isOpen;
      component.toggle();
      expect(component.isOpen).toBe(!open);
    });
  });
});
