import { MessageService } from './../message.service';
import { Character} from '../character';
import { CharacterService } from './../character.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CharacterDetailsComponent } from './../character-details/character-details.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterPageComponent } from './character-page.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireList } from 'angularfire2/database';

import { environment } from '../../environments/environment';

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

  // TODO: See character.service.spec for info on cannot read property of null
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
