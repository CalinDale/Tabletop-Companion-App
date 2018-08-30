import { Observable } from 'rxjs';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { TestBed, inject } from '@angular/core/testing';

import { AttributeService } from './attribute.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';

import { environment } from '../environments/environment';

import { Attribute } from './attribute';
import { AngularFireList, AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { userInfo } from 'os';

describe('AttributeService', () => {
  let testCharacterID: string;
  let testUserId: string;
  let testAttribute: Attribute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttributeService],
      imports: [
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule, // for database
      ]
    });

    testCharacterID = 'Dragon223';
    testUserId = 'Dave55';
    testAttribute = {name: 'Armor', type: 'number', value: '20', characterID: testCharacterID, userID: testUserId};
  });

  afterEach(() => {
    testCharacterID = null;
  });

  it('should be created', inject([AttributeService], (service: AttributeService) => {
    expect(service).toBeTruthy();
  }));

  // TODO: Make this test when we know how.
  // it('should get userID', inject([AttributeService], (service: AttributeService ) => { }));

  it('setCharacterID should set CharacterID', inject([AttributeService], (service: AttributeService) => {
    service.setCharacterID(testCharacterID);
    expect(service.characterID).toBe(testCharacterID);
  }));

  it('getCharacterID should get CharacterID', inject([AttributeService], (service: AttributeService) => {
    service.characterID = testCharacterID;
    expect(service.getCharacterID()).toBe(testCharacterID);
  }));

  // TODO: solve: Error: <spyOn> : could not find an object to spy upon for push()
  // it('createAttribute should push attribute to db', inject([AttributeService], (service: AttributeService) => {
  //  spyOn(service.attributesRef, 'push');
//
  //  service.createAttribute(null);
  //  expect(service.attributesRef.push).toHaveBeenCalledWith(null);
  // }));

  // TODO: solve: Error: <spyOn> : could not find an object to spy upon for update()
  // it('createAttribute should push attribute to db', inject([AttributeService], (service: AttributeService) => {
  //  spyOn(service.attributesRef, 'update');
//
  //  service.updateAttribute(null, null);
  //  expect(service.attributesRef.push).toHaveBeenCalledWith(null, null);
  // }));

});

describe('AttributeService2', () => {
  let testAngularFireList: AngularFireList<Attribute>;
  let db: AngularFireDatabase;
  let testCharacterID: string;
  let testUserId: string;
  let testAttribute: Attribute;
  let testAuthState: Observable<firebase.User>;
  let service: AttributeService;

  beforeEach(() => {
    testAngularFireList = jasmine.createSpyObj('testAngularFireList', [
      'push',
      'update',
      'remove'
    ]);
    (<jasmine.Spy>(testAngularFireList.update)).and.returnValue({catch(): void {}});

    db = jasmine.createSpyObj('db', ['list']);
    (<jasmine.Spy>(db.list)).and.returnValue(testAngularFireList);

    // (<jasmine.Spy>(testAngularFireList.update)).and.returnValue({catch() {} });

    testCharacterID = 'Dragon223';
    testUserId = 'Dave55';
    testAttribute = {name: 'Armor', type: 'number', value: '20', characterID: testCharacterID, userID: testUserId};

    testAuthState = new Observable((observer) => {
      return {unsubscribe() { const user = {uid: testUserId }; }};
    });
    service = new AttributeService(db, <AngularFireAuth>{ authState: testAuthState });
  });

  afterEach(() => {
    testAngularFireList = null;
    db = null;
    testCharacterID = null;
    testUserId = null;
    testAttribute = null;
    testAuthState = null;
    service = null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO: it('should get userID from AngularFireAuth', () => {
  //   expect(service.userID).toBe( testUserId );
  // });

  it('createAttribute should get list from db', () => {
    service.createAttribute(testAttribute);
    expect(db.list).toHaveBeenCalled();
  });

  it('createAttribute should push attribute to db list', () => {
    service.createAttribute(testAttribute);
    expect(testAngularFireList.push).toHaveBeenCalledWith(testAttribute);
  });

  it('updateAttribute should update db list', () => {
    service.createAttribute(testAttribute);
    service.updateAttribute(testAttribute.name, testAttribute.value);
    expect(testAngularFireList.update).toHaveBeenCalledWith(testAttribute.name, testAttribute.value);
  });
});
