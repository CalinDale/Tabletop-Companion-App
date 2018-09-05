import { CharacterService } from './character.service';

import { AngularFireList, AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

import { Character } from './character';


describe('CharacterService', () => {
  let testAngularFireList: AngularFireList<Character>;
  let testDb: AngularFireDatabase;
  let testUserId: string;
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

    testDb = jasmine.createSpyObj('db', ['list']);
    (<jasmine.Spy>(testDb.list)).and.returnValue(testAngularFireList);

    testUserId = 'Dave55';

    testAuthState = new Observable((observer) => {
      return {unsubscribe() { const user = {uid: testUserId }; }};
    });

    service = new CharacterService(testDb, <AngularFireAuth>{ authState: testAuthState});
  });
  afterEach(() => {
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO: it('should get userID from AngularFireAuth', () => {
  //   expect(service.userID).toBe( testUserId );
  // });
});
