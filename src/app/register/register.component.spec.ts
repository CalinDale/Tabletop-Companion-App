import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { RegisterComponent } from './register.component';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../core/auth.service';

describe('RegisterComponent', () => {
  let testAuth: AuthService;
  let testFB: FormBuilder;
  let testRouter: Router;
  let component: RegisterComponent;
  beforeEach(() => {
    testAuth = jasmine.createSpyObj('testAuth', [
      'emailSignUp',
      'updateUserData'
    ]);
    testFB = jasmine.createSpyObj('testFB', [
      'group'
    ]);
    (<jasmine.Spy>testFB.group).and.returnValue( <FormGroup>{} );
    testRouter = jasmine.createSpyObj('testRouter', [
      'navigate'
    ]);
    component = new RegisterComponent(testAuth, testFB, testRouter);
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
