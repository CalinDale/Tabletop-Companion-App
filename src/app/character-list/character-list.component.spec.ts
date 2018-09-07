import { MessageService } from '../message.service';
import { Character} from '../character';
import { CharacterService } from '../character.service';

import { CharacterListComponent } from './character-list.component';

import {  AngularFireList } from 'angularfire2/database';


describe('CharacterListComponent', () => {
  let testCharactersList: AngularFireList<Character>;
  let testCharacterService: CharacterService;
  let testMesageService: MessageService;
  let component: CharacterListComponent;
  beforeEach(() => {
    testCharactersList = jasmine.createSpyObj('testCharactersList', [
      'snapshotChanges'
    ]);
    (<jasmine.Spy>(testCharactersList.snapshotChanges)).and.returnValue( { pipe() {} } );
    testCharacterService = jasmine.createSpyObj('testCharacterService', [
      'getCharactersList',
      'deleteAll',
    ]);
    (<jasmine.Spy>(testCharacterService.getCharactersList)).and.returnValue(testCharactersList);

    testMesageService = jasmine.createSpyObj('testMessageService', [
      'add'
    ]);

    component = new CharacterListComponent(testCharacterService, testMesageService);
  });
  afterEach(() => {
    testCharactersList = null;
    testCharacterService = null;
    testMesageService = null;
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggle() should set isOpen to the opposite of what it was', () => {
    const open = component.isOpen;
    component.toggle();
    expect(component.isOpen).toBe(!open);
  });
});
