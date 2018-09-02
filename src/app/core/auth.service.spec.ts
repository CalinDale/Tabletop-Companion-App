import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';

import * as firebase from 'firebase';
import { auth } from 'firebase';

describe('AuthService', () => {
  let testAuthState: Observable<firebase.User>;
  let testUserCredential: Promise<auth.UserCredential>;
  let testAuth: any;
  let testAfAuth: AngularFireAuth;
  let testAfs: AngularFirestore;
  let testRouter: Router;
  let service: AuthService;
  beforeEach(() => {
    testAuthState = new Observable((observer) => {
      return {unsubscribe() {} };
    });

    testUserCredential = new Promise( null );

    testAuth = {
      signInWithPopup() {},
      signInAnonymously() {},
      createUserWithEmailAndPassword() {},
      signInWithEmailAndPassword() {}
    };

    spyOn(testAuth, 'signInWithPopup').and.returnValue(testUserCredential);
    spyOn(testAuth, 'signInAnonymously').and.returnValue(testUserCredential);
    spyOn(testAuth, 'createUserWithEmailAndPassword').and.returnValue(testUserCredential);
    spyOn(testAuth, 'signInWithEmailAndPassword').and.returnValue(testUserCredential);

    testAfAuth = <AngularFireAuth>{ authState: testAuthState, auth: testAuth };

    service = new AuthService(testAfAuth, testAfs, testRouter);
  });
  afterEach(() => {
    testAuthState = null;
    testUserCredential = null;
    testAuth = null;
    testAfAuth = null;
    testAfs = null;
    testRouter = null;
    service = null;
  });

  // TODO: FIX THIS SERVICE'S TESTS.
  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
