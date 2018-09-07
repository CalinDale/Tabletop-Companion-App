import { MessageService } from '../message.service';
import { Character} from '../character';
import { CharacterService } from '../character.service';

import { CharacterPageComponent } from './character-page.component';

import {  AngularFireList } from 'angularfire2/database';


describe('CharacterPageComponent', () => {
  let testCharactersList: AngularFireList<Character>;
  let testCharacterService: CharacterService;
  let testMesageService: MessageService;
  let component: CharacterPageComponent;
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

    component = new CharacterPageComponent(testCharacterService, testMesageService);
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
});
