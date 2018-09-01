import { MessageService } from './../message.service';
import { CharacterService } from './../character.service';
import { UserProfileComponent } from './../user-profile/user-profile.component';
import { AddAttributeComponent } from './../add-attribute/add-attribute.component';
import { CreateCharacterComponent } from './../create-character/create-character.component';
import { CharacterPageComponent } from './../character-page/character-page.component';
import { TrackerComponent } from './../tracker/tracker.component';
import { AppRoutingModule } from './../app-routing/app-routing.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDetailsComponent } from './character-details.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../../environments/environment';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { APP_BASE_HREF } from '../../../node_modules/@angular/common';
import { AttributeService } from '../attribute.service';

import { Router } from '@angular/router';
import { Character } from '../character';

// describe('CharacterDetailsComponent', () => {
//   let component: CharacterDetailsComponent;
//   let fixture: ComponentFixture<CharacterDetailsComponent>;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         CharacterDetailsComponent,
//         TrackerComponent,
//         CharacterPageComponent,
//         CreateCharacterComponent,
//         AddAttributeComponent,
//         UserProfileComponent
//       ],
//       imports: [
//         FormsModule,
//         AppRoutingModule,
//         AngularFireAuthModule,
//         AngularFireModule.initializeApp(environment.firebase),
//         AngularFireDatabaseModule // for database
//       ],
//       providers: [
//         {provide: APP_BASE_HREF, useValue : '/' }
//       ]
//     })
//     .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(CharacterDetailsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

describe('CharacterDetailsComponent', () => {
  let testCharacterService: CharacterService;
  let testMessageService: MessageService;
  let testAttributeSerice: AttributeService;
  let testRouter: Router;
  let component: CharacterDetailsComponent;
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
    component = new CharacterDetailsComponent(
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
    it('createAttribute() should send character.key to attributeService.setCharacterID', () => {
      component.createAttribute();
      expect(testAttributeSerice.setCharacterID).toHaveBeenCalledWith(testCharacter.key);
    });
    it('createAttribute() should call router to navigate to addattribute', () => {
      component.createAttribute();
      expect(testRouter.navigateByUrl).toHaveBeenCalledWith('addattribute');
    });
  });
});
