import { Observable } from 'rxjs';

import { AttributeService } from './attribute.service';

import { Attribute } from './attribute';
import { AngularFireList, AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

// describe('AttributeService', () => {
//   let testCharacterID: string;
//   let testUserId: string;
//   let testAttribute: Attribute;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [AttributeService],
//       imports: [
//         AngularFireAuthModule,
//         AngularFireModule.initializeApp(environment.firebase),
//         AngularFireDatabaseModule, // for database
//       ]
//     });
//
//     testCharacterID = 'Dragon223';
//     testUserId = 'Dave55';
//     testAttribute = {name: 'Armor', type: 'number', value: '20', characterID: testCharacterID, userID: testUserId};
//   });
//
//   afterEach(() => {
//     testCharacterID = null;
//   });
//
//   it('should be created', inject([AttributeService], (service: AttributeService) => {
//     expect(service).toBeTruthy();
//   }));
//
// });

describe('AttributeService', () => {
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
    (<jasmine.Spy>(testAngularFireList.remove)).and.returnValue({catch(): void {}});

    db = jasmine.createSpyObj('db', ['list']);
    (<jasmine.Spy>(db.list)).and.returnValue(testAngularFireList);

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

  it('setCharacterID should set CharacterID', () => {
    service.setCharacterID(testCharacterID);
    expect(service.characterID).toBe(testCharacterID);
  });

  it('getCharacterID should get CharacterID', () => {
    service.characterID = testCharacterID;
    expect(service.getCharacterID()).toBe(testCharacterID);
  });

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

  it('deleteAttribute should remove it from db list', () => {
    service.createAttribute(testAttribute);
    service.deleteAttribute(testAttribute.name);
    expect(testAngularFireList.remove).toHaveBeenCalledWith(testAttribute.name);
  });
});
