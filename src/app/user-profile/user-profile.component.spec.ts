import { AuthService } from '../core/auth.service';
import { UserProfileComponent } from './user-profile.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '../../../node_modules/@angular/router';

describe('UserProfileComponent', () => {
  let testAuth: AuthService;
  let testFB: FormBuilder;
  let component: UserProfileComponent;
  let testRouter: Router;
  beforeEach(() => {
    testAuth = jasmine.createSpyObj('testAuth', [
      'needsomethinghere'
    ]);
    testFB = jasmine.createSpyObj('testFB', [
      'needsomethinghere'
    ]);
    testRouter = jasmine.createSpyObj('testRouter', [
      'navigate'
    ]);
    component = new UserProfileComponent(testAuth, testFB, testRouter);
  });
  afterEach(() => {
    testAuth = null;
    testFB = null;
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
