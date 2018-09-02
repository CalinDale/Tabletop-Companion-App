import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';

import { RegisterComponent } from './register.component';
import { FormBuilder } from '../../../node_modules/@angular/forms';
import { AuthService } from '../core/auth.service';

describe('RegisterComponent', () => {
  let testAuth: AuthService;
  let testFB: FormBuilder;
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
    component = new RegisterComponent(testAuth, testFB);
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
