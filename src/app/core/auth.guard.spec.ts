import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let testUser: Observable<firebase.User>;
  let testAuthService: AuthService;
  let testRouter: Router;
  let authGaurd: AuthGuard;
  beforeEach(() => {

    testUser = new Observable((observer) => {
      return {unsubscribe() {} };
    });

    testAuthService = jasmine.createSpyObj('testAuthService', [
      'needSomethingToBeHere'
    ]);
    testAuthService.user = testUser;

    testRouter = jasmine.createSpyObj('testRouter', [
      'navigate'
    ]);
    authGaurd = new AuthGuard(testAuthService, testRouter);
  });
  afterEach(() => {
    testAuthService = null;
    testRouter = null;
    authGaurd = null;
  });

  it('should ...', () => {
    expect(authGaurd).toBeTruthy();
  });
});
