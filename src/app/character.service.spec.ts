import { CharacterService } from './character.service';

import { AngularFireList, AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

import { Character } from './character';


describe('CharacterService', () => {
  let testAngularFireList: AngularFireList<Character>;
  let testDb: AngularFireDatabase;
  let testUserId: string;
  let testCharacter: Character;
  let testAuthState: Observable<firebase.User>;

  let service: CharacterService;

  beforeEach(() => {
    testAngularFireList = jasmine.createSpyObj('testAngularFireList', [
      'push',
      'update',
      'remove'
    ]);
    (<jasmine.Spy>(testAngularFireList.update)).and.returnValue({catch(): void {}});
    (<jasmine.Spy>(testAngularFireList.remove)).and.returnValue({catch(): void {}});

    testDb = jasmine.createSpyObj('testDb', ['list']);
    (<jasmine.Spy>(testDb.list)).and.returnValue(testAngularFireList);

    testUserId = 'Dave55';
    testCharacter = {
      key: '23',
      name: 'Grog',
      userID: testUserId,
    };

    testAuthState = new Observable((observer) => {
      return {unsubscribe() { const user = {uid: testUserId }; }};
    });

    // TODO: cannot read snapshot of null should pass when a user id is propperly supplied in constructor observable
    service = new CharacterService(testDb, <AngularFireAuth>{ authState: testAuthState});
  });
  afterEach(() => {
    testAngularFireList = null;
    testDb = null;
    testUserId = null;
    testCharacter = null;
    testAuthState = null;
    service = null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO: it('should get userID from AngularFireAuth', () => {
  //   expect(service.userID).toBe( testUserId );
  // });

  // TODO: test handleError somehow?

  describe('with valid userID', () => {
    beforeEach(() => {
      service.userID = testUserId;
    });
    afterEach(() => {
      service.userID = null;
    });

    it('getCharacterList() should set charactersRef to list from db', () => {
      service.getCharactersList();
      expect(service.charactersRef).toBe(testAngularFireList);
    });

    it('getCharacterList() should return the list from db list', () => {
      service.getCharactersList();
      expect(service.charactersRef).toBe(testAngularFireList);
    });

    describe('with charactersRef assigned to db list', () => {
      beforeEach(() => {
        service.charactersRef = testAngularFireList;
      });

      it('createCharacter() should push character to db list', () => {
        service.createCharacter(testCharacter);
        expect(testAngularFireList.push).toHaveBeenCalledWith(testCharacter);
      });

      it('updateCharacter() should update db list', () => {
        service.updateCharacter(testCharacter.key, testCharacter);
        expect(testAngularFireList.update).toHaveBeenCalledWith(testCharacter.key, testCharacter);
      });

      it('deleteAttribute() should remove it from db list', () => {
        service.deleteCharacter(testCharacter.key);
        expect(testAngularFireList.remove).toHaveBeenCalledWith(testCharacter.key);
      });

      it('deleteAll() should call remove on db list', () => {
        service.deleteAll();
        expect(testAngularFireList.remove).toHaveBeenCalledWith();
      });
    });
  });

  describe('without valid userID', () => {
    it('getCharacterList should do nothing', () => {
      expect(service.getCharactersList()).toBeUndefined();
    });
  });
});
