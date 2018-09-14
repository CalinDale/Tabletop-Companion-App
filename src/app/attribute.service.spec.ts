import { Observable } from 'rxjs';

import { AttributeService } from './attribute.service';

import { Attribute } from './attribute';
import { AngularFireList, AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

describe('AttributeService', () => {
  let testAngularFireList: AngularFireList<Attribute>;
  let testDb: AngularFireDatabase;
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

    testDb = jasmine.createSpyObj('testDb', [
      'list',
      'object'
    ]);
    (<jasmine.Spy>(testDb.list)).and.returnValue(testAngularFireList);
    (<jasmine.Spy>(testDb.object)).and.returnValue(testAngularFireList);

    testCharacterID = 'Dragon223';
    testUserId = 'Dave55';
    testAttribute = <Attribute>{
      name: 'Armor',
      type: 'number',
      value: '20',
      characterID: testCharacterID,
      userID: testUserId
    };

    testAuthState = new Observable((observer) => {
      return {unsubscribe() { const user = {uid: testUserId }; }};
    });
    service = new AttributeService(testDb, <AngularFireAuth>{ authState: testAuthState });
  });

  afterEach(() => {
    testAngularFireList = null;
    testDb = null;
    testCharacterID = null;
    testUserId = null;
    testAttribute = null;
    testAuthState = null;
    service = null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO: Research CharacterPageComponent tests for this one.
  // it('should get userID from AngularFireAuth', () => {
  //   expect(service.userID).toBe( testUserId );
  // });

  it('setCharacterID() should set CharacterID', () => {
    service.setCharacterID(testCharacterID);
    expect(service.characterID).toBe(testCharacterID);
  });

  it('getCharacterID() should get CharacterID', () => {
    service.characterID = testCharacterID;
    expect(service.getCharacterID()).toBe(testCharacterID);
  });

  it('createAttribute() should set attributeRef to the list from db', () => {
    service.createAttribute(testAttribute);
    expect(service.attributesRef).toBe(testAngularFireList);
  });

  it('createAttribute() should push attribute to db list', () => {
    service.createAttribute(testAttribute);
    expect(testAngularFireList.push).toHaveBeenCalledWith(testAttribute);
  });

  // TODO: test handleError somehow?

  describe('With db list as AttributesRef', () => {
    beforeEach(() => {
      service.attributesRef = testAngularFireList;
    });
    afterEach(() => {
      service.attributesRef = null;
    });

    describe('with userID set', () => {
      beforeEach(() => {
        service.userID = testUserId;
      });
      afterEach(() => {
        service.userID = null;
      });

      // TODO: this.db.object is not a function?
      it('getAttributes() should return the list from db list using the characterID', () => {
        expect(service.getAttributes(testCharacterID)).toBe(testAngularFireList);
      });
    });

    it('updateAttribute() should update db list', () => {
      service.updateAttribute(testAttribute);
      expect(testAngularFireList.update).toHaveBeenCalledWith(testAttribute);
    });

    it('deleteAttribute() should remove it from db list', () => {
      service.deleteAttribute(testAttribute.name);
      expect(testAngularFireList.remove).toHaveBeenCalledWith(testAttribute.name);
    });

    it('deleteAll() should call remove on db list', () => {
      service.deleteAll();
      expect(testAngularFireList.remove).toHaveBeenCalledWith();
    });
  });
});
